# Shopify Delivery Customization App — Plan

## Context

### Why this exists

The Wacoal welfare system has a new user type: **client users** (external partners/clients who register via campaign code). These users do not have employee IDs or company affiliations. Because the Wacoal warehouse is located inside a restricted factory compound, guest access is not permitted — client users must never be allowed to choose "local pickup" at checkout.

Wacoal welfare stores run on standard Shopify plans (not Plus), so `checkout.liquid` customization is unavailable. The only supported mechanism to hide a shipping method at checkout on non-Plus plans is a **Shopify Delivery Customization Function**.

### How the Laravel backend already handles its part

When a client user registers via campaign:

1. `CampaignRegistrationController::store()` creates (or updates) the Shopify customer with the tag `Client_NoPickup` in addition to the campaign tag.
2. A `WelfareData` record is saved locally with `type = 'client'`.

The Laravel app's tagging responsibility is **already implemented**. This Shopify app's only job is to read that tag at checkout and hide pickup.

---

## What needs to be built

A separate **Shopify app** (Node.js / Remix) containing one **Delivery Customization Function** extension. This function:

- Runs server-side inside Shopify's infrastructure at checkout time (Wasm)
- Receives the cart, delivery groups, and customer context
- Hides any local pickup delivery option when the customer has the `Client_NoPickup` tag

Once deployed, the function is activated on each relevant store via a single `deliveryCustomizationCreate` GraphQL call — which will be wired as an Artisan command in the Laravel app.

---

## Project structure

```
shopify-delivery-customization/          ← new repo / directory (outside this Laravel repo)
├── shopify.app.toml
├── package.json
├── remix.config.js                      ← Remix app shell (required by Shopify CLI)
├── app/
│   └── routes/                          ← minimal Remix routes (app install, auth)
└── extensions/
    └── hide-pickup-for-clients/
        ├── shopify.extension.toml
        ├── src/
        │   └── index.js                 ← function logic (compiled to Wasm by Shopify CLI)
        └── schema.graphql
```

---

## Step-by-step build plan

### Step 1 — Prerequisites

- Shopify Partner account (or use existing)
- Shopify CLI v3+ installed: `npm install -g @shopify/cli`
- Node.js 18+
- The app must be installed on the target store(s) to activate the function

### Step 2 — Scaffold the app

```bash
npm init @shopify/app@latest
# choose: Start by adding your first extension
# extension type: Delivery customization
# language: JavaScript
```

Or scaffold manually:

```bash
shopify app init
shopify app generate extension --template delivery_customizations --name hide-pickup-for-clients
```

### Step 3 — Write the function logic

File: `extensions/hide-pickup-for-clients/src/index.js`

```js
// @ts-check
import { DeliveryCustomizationResult } from "@shopify/shopify_function";

/**
 * Shopify Delivery Customization Function
 * Hides all local pickup options for customers tagged "Client_NoPickup".
 *
 * Input object shape is defined by Shopify's function API:
 *   input.cart.buyerIdentity.customer  — customer context (may be null for guest)
 *   input.cart.deliveryGroups          — array of delivery groups with options
 */
export default function run(input) {
  const customerTags = input.cart?.buyerIdentity?.customer?.tags ?? [];

  // Only apply restriction if customer has the Client_NoPickup tag
  if (!customerTags.includes("Client_NoPickup")) {
    return { operations: [] };
  }

  // Collect handles of all local-pickup delivery options across all groups
  const hideOperations = input.cart.deliveryGroups.flatMap((group) =>
    group.deliveryOptions
      .filter(
        (option) =>
          option.code === "PICK_UP" ||
          option.title?.toLowerCase().includes("pickup") ||
          option.title?.toLowerCase().includes("pick up") ||
          option.title?.toLowerCase().includes("รับสินค้า")   // Thai label fallback
      )
      .map((option) => ({
        hide: { deliveryOptionHandle: option.handle },
      }))
  );

  return { operations: hideOperations };
}
```

### Step 4 — Configure the extension manifest

File: `extensions/hide-pickup-for-clients/shopify.extension.toml`

```toml
api_version = "2026-01"

[[extensions]]
type = "function"
name = "Hide pickup for client users"
handle = "hide-pickup-for-clients"
runtime = "wasm"
build_command = "shopify app function build"

[[extensions.input.variables]]
  name = "cart"
  type = "Cart"

[[extensions.input.variables]]
  name = "deliveryGroups"
  type = "[DeliveryGroup!]!"
```

### Step 5 — Deploy

```bash
shopify app deploy
```

Shopify CLI compiles the JS to Wasm and registers the function. After deployment, note the **function ID** from the output (format: `gid://shopify/ShopifyFunction/...`).

### Step 6 — Activate via Laravel Artisan command

In the Laravel repo (`shopify-api`), add an Artisan command that calls `deliveryCustomizationCreate` on each welfare store:

```php
// app/Console/Commands/ActivateDeliveryCustomization.php

php artisan welfare:activate-pickup-restriction --store=twcwelfare --function-id=gid://shopify/ShopifyFunction/xxxxx
```

The command executes this GraphQL mutation on the target store:

```graphql
mutation {
  deliveryCustomizationCreate(deliveryCustomization: {
    functionId: "gid://shopify/ShopifyFunction/xxxxx",
    title: "Hide pickup for client users",
    enabled: true
  }) {
    deliveryCustomization {
      id
      title
      enabled
    }
    userErrors {
      field
      message
    }
  }
}
```

This is a **one-time activation per store**. Once activated, the function runs automatically on every checkout for that store. Store the returned `deliveryCustomization.id` in `.env` or config for future reference (e.g., to disable/re-enable).

---

## Multi-store considerations

The welfare function only needs to be active on stores where client users shop. Based on current config, that is `twcwelfare`. If campaigns expand to other stores, run the activation command for each:

```bash
php artisan welfare:activate-pickup-restriction --store=twcwelfare --function-id=...
```

The function itself reads the `Client_NoPickup` tag — so any store where the function is activated will automatically respect it, regardless of campaign.

---

## Testing

| Scenario | Expected result |
|----------|----------------|
| Guest checkout (no customer) | Pickup shown normally |
| Employee customer (no `Client_NoPickup` tag) | Pickup shown normally |
| Client user (has `Client_NoPickup` tag) | Pickup option hidden |
| Client user, store with no pickup locations | No change (nothing to hide) |

To test locally before deploy:

```bash
shopify app function run
# paste sample input JSON with customer tags including / excluding Client_NoPickup
```

---

## Activation checklist

- [x] Shopify Partner account created / confirmed — Node.js v22, Shopify CLI v3.89 verified 2026-04-10
- [x] `shopify app init` scaffolded — files created manually 2026-04-10: package.json, shopify.app.toml, .env.example, .gitignore, app/routes/_index.jsx. Fill in `client_id` in shopify.app.toml after creating app in Partner Dashboard.
- [x] Function logic written 2026-04-10: extensions/hide-pickup-for-clients/src/index.js + src/run.graphql. Unit test with `shopify app function run` pending deploy step.
- [x] Extension manifest configured 2026-04-10: extensions/hide-pickup-for-clients/shopify.extension.toml (api_version 2026-01, type=function, input query_path set)
- [ ] `shopify app deploy` successful — function ID noted (requires Partner Dashboard client_id in shopify.app.toml first)
- [ ] Laravel Artisan command `welfare:activate-pickup-restriction` created
- [ ] Command run on `twcwelfare` store
- [ ] End-to-end test: client user checkout on twcwelfare — pickup hidden
- [ ] End-to-end test: employee checkout on twcwelfare — pickup visible

---

## Reference

- Shopify Functions docs: https://shopify.dev/docs/apps/build/functions
- Delivery Customization API: https://shopify.dev/docs/api/functions/reference/delivery-customization
- Shopify CLI: https://shopify.dev/docs/api/shopify-cli
