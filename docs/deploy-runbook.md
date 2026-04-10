# Deploy Runbook

## Netlify (Testing / Staging)

The Remix app shell (OAuth/install flow) is deployed to Netlify.
The Shopify Function (Wasm) is still deployed via `shopify app deploy` — it runs
inside Shopify's own infrastructure, not on Netlify.

### 1. Deploy the Remix shell to Netlify

```bash
# Push to GitHub and connect the repo in app.netlify.com
# Netlify auto-detects Remix + Vite via netlify.toml

# Or deploy manually via CLI:
npx netlify-cli deploy --prod
```

After deploy, Netlify gives you a URL like `https://your-site.netlify.app`.

### 2. Set environment variables in Netlify dashboard

| Variable | Value |
|---|---|
| `SHOPIFY_API_KEY` | From Partner Dashboard → App → API credentials |
| `SHOPIFY_API_SECRET` | From Partner Dashboard → App → API credentials |
| `SHOPIFY_APP_URL` | `https://your-site.netlify.app` |
| `SCOPES` | (leave empty — no scopes needed) |

### 3. Update app URLs

In `shopify.app.toml` and Partner Dashboard, set:
- **Application URL**: `https://your-site.netlify.app`
- **Redirect URLs**: `https://your-site.netlify.app/auth/callback`

> **Session storage note:** `MemorySessionStorage` is used for testing. Sessions are
> lost on Netlify cold starts — merchants may need to re-auth occasionally. This is
> acceptable for testing. Swap to a database session storage before production.

---

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
