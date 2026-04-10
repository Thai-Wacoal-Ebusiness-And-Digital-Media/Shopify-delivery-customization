# Deploy Runbook

## Step 1 — Create the app in Shopify Partner Dashboard

1. Go to [partners.shopify.com](https://partners.shopify.com) → Apps → Create app
2. Choose **Build app with Shopify CLI**
3. Copy the generated **Client ID** and paste it into `shopify.app.toml`:
   ```toml
   client_id = "PASTE_HERE"
   ```
4. Install the app on the `twcwelfare` store (from Partner Dashboard → Apps → select app → Test on development store, or install on production store)

## Step 2 — Deploy the function

```bash
npm install
shopify app deploy
```

After deployment Shopify CLI outputs the function ID:
```
Function ID: gid://shopify/ShopifyFunction/XXXXXXXXXXXXXXXX
```

Note this ID — you need it for activation.

## Step 3 — Activate on twcwelfare store

In the `shopify-api` Laravel repo, run:

```bash
php artisan welfare:activate-pickup-restriction \
  --store=twcwelfare \
  --function-id=gid://shopify/ShopifyFunction/XXXXXXXXXXXXXXXX
```

This runs the `deliveryCustomizationCreate` GraphQL mutation on the store.
Store the returned `deliveryCustomization.id` in the Laravel `.env` or config for future reference.

## Step 4 — Verify end-to-end

| Scenario | Expected |
|---|---|
| Guest checkout | Pickup visible |
| Employee (no tag) | Pickup visible |
| Client user (`Client_NoPickup` tag) | Pickup hidden |

## Re-deploy after changes

```bash
shopify app deploy
```

The function ID stays the same after re-deploy — no need to re-activate.
