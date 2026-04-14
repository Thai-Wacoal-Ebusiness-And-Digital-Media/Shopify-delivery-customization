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
├── shopify.app.ebiz-delivery-custom-dev.toml   ← dev branch config (created by CLI --reset)
├── package.json
├── remix.config.js                      ← Remix app shell (required by Shopify CLI)
├── app/
│   └── routes/                          ← minimal Remix routes (app install, auth)
└── extensions/
    └── hide-pickup-for-clients/
        ├── shopify.extension.toml
        ├── src/
        │   ├── index.js                 ← function logic (compiled to Wasm by Shopify CLI)
        │   ├── run.graphql              ← GraphQL input query for the function
        │   └── run.types.d.ts
        └── schema.graphql
```

---

## Current deployment state (as of 2026-04-13)

### Two Shopify apps exist

| App | Client ID | URL | Branch |
|-----|-----------|-----|--------|
| `ebiz-delivery-customization` (production) | (see Partners dashboard) | (see Netlify dashboard) | `main` |
| `ebiz-delivery-custom-dev` (dev/testing) | (see Partners dashboard) | (see Netlify dashboard) | `dev` |

**Active testing is on the `dev` branch / dev app.** Production (`main`) has not been updated since the auth fixes were made on `dev`.

### Function ID (dev app)

```
gid://shopify/ShopifyFunction/40314a48-c2a3-0aaf-f973-6d88535d16d8bcf1f871
```

UID in `extensions/hide-pickup-for-clients/shopify.extension.toml`: `40314a48-c2a3-0aaf-f973-6d88535d16d8bcf1f871`

### Netlify environment variables (required per branch)

| Variable | Production context | Dev branch context |
|----------|-------------------|-------------------|
| `SHOPIFY_API_KEY` | (production client ID — see Partners dashboard) | (dev client ID — see Partners dashboard) |
| `SHOPIFY_API_SECRET` | (production secret) | (dev secret — stored in Netlify env vars only, not in repo) |
| `SHOPIFY_APP_URL` | (production URL — see Netlify dashboard) | (dev URL — see Netlify dashboard) |
| `DATABASE_URL` | Neon pooler URL (`-pooler` hostname, `sslmode=require` only — no `channel_binding`) | same pooler URL |
| `PGSSLMODE` | `require` | `require` |
| `SCOPES` | `read_customers` | `read_customers` |

**IMPORTANT:** `DATABASE_URL` must use the **Neon pooler** hostname (`ep-autumn-sea-a1rfd9ig-pooler.ap-southeast-1.aws.neon.tech`) and must NOT include `channel_binding=require` — that parameter causes `ECONNRESET` with the `pg` library.

### Key fixes applied to the Remix app (all on `dev` branch)

1. **Session storage**: Switched from SQLite to PostgreSQL (`@shopify/shopify-app-session-storage-postgresql`) using Neon.tech free tier.
2. **Token exchange auth**: Enabled `unstable_newEmbeddedAuthStrategy: true` in `shopify.server.js` — uses Shopify session token exchange instead of OAuth redirect (required because OAuth redirects inside an iframe fail with `X-Frame-Options: DENY`).
3. **`id_token` passthrough**: `app/routes/_index.jsx` now forwards `id_token` query param when redirecting to `/app` (required for token exchange to work).
4. **exitIframe fix**: `app/routes/app.jsx` intercepts the library's bounce redirect to `admin.shopify.com` and returns HTML that does `window.top.location.href = ...` instead of a plain 302 — prevents blank iframe caused by `X-Frame-Options: DENY` on admin.shopify.com.

---

## Step-by-step build plan

### Step 1 — Prerequisites ✅

- Shopify Partner account (or use existing)
- Shopify CLI v3+ installed: `npm install -g @shopify/cli`
- Node.js 18+
- The app must be installed on the target store(s) to activate the function

### Step 2 — Scaffold the app ✅

Done. App scaffolded and hosted on Netlify.

### Step 3 — Write the function logic ✅

File: `extensions/hide-pickup-for-clients/src/index.js` — complete.

Uses `hasAnyTag(tags: ["Client_NoPickup"])` via `run.graphql` (the Functions API does not expose `customer.tags` directly, so `hasAnyTag` is the correct approach).

### Step 4 — Configure the extension manifest ✅

File: `extensions/hide-pickup-for-clients/shopify.extension.toml` — complete.

### Step 5 — Deploy ✅

```bash
shopify app deploy
```

Deployed on 2026-04-13. Function ID:
```
gid://shopify/ShopifyFunction/40314a48-c2a3-0aaf-f973-6d88535d16d8bcf1f871
```

### Step 6 — Activate via Laravel Artisan command ⬅️ NEXT

In the Laravel repo (`shopify-api`), create an Artisan command that calls `deliveryCustomizationCreate` on the welfare store:

```bash
php artisan welfare:activate-pickup-restriction --store=twcwelfare --function-id=gid://shopify/ShopifyFunction/40314a48-c2a3-0aaf-f973-6d88535d16d8bcf1f871
```

The command executes this GraphQL mutation on the target store:

```graphql
mutation {
  deliveryCustomizationCreate(deliveryCustomization: {
    functionId: "gid://shopify/ShopifyFunction/40314a48-c2a3-0aaf-f973-6d88535d16d8bcf1f871",
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
- [x] `shopify app init` scaffolded — 2026-04-10
- [x] Function logic written — `extensions/hide-pickup-for-clients/src/index.js` + `src/run.graphql`
- [x] Extension manifest configured — `extensions/hide-pickup-for-clients/shopify.extension.toml`
- [x] Remix app shell working — hosted on Netlify, embedded in Shopify admin, auth working (dev branch)
- [x] `shopify app deploy` successful — 2026-04-13, function ID: `gid://shopify/ShopifyFunction/40314a48-c2a3-0aaf-f973-6d88535d16d8bcf1f871`
- [ ] Laravel Artisan command `welfare:activate-pickup-restriction` created (implement in `shopify-api` repo)
- [ ] Command run on `twcwelfare` store with the function ID above
- [ ] End-to-end test: client user (`Client_NoPickup` tag) checkout on twcwelfare — pickup hidden
- [ ] End-to-end test: employee checkout on twcwelfare — pickup visible

> Full deploy and activation steps: `docs/deploy-runbook.md`

---

## Reference

- Shopify Functions docs: https://shopify.dev/docs/apps/build/functions
- Delivery Customization API: https://shopify.dev/docs/api/functions/reference/delivery-customization
- Shopify CLI: https://shopify.dev/docs/api/shopify-cli
