# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-purpose **Shopify Delivery Customization Function** app (Node.js/Remix) that hides local pickup options at checkout for customers tagged `Client_NoPickup`. These are Wacoal welfare "client users" (external partners registered via campaign code) who cannot access the warehouse inside the restricted factory compound.

Standard Shopify plans do not support `checkout.liquid` customization — Shopify Functions (compiled to WebAssembly) are the only supported mechanism.

The Laravel `shopify-api` backend already handles tagging customers with `Client_NoPickup` when they register. This app reads that tag at checkout and acts on it.

## Commands

```bash
# Install dependencies (after scaffolding)
npm install

# Local development server
shopify app dev

# Test the function locally with sample JSON
shopify app function run

# Build and deploy to Shopify (compiles JS → Wasm)
shopify app deploy

# Lint / format (once configured)
npm run lint
```

Requirements: Node.js 18+, Shopify CLI v3+ (`npm install -g @shopify/cli`)

## Architecture

```
extensions/
  hide-pickup-for-clients/
    src/index.js              ← Core function logic (JS compiled → Wasm by Shopify CLI)
    shopify.extension.toml    ← Function manifest (api_version, runtime, input variables)
    schema.graphql            ← GraphQL input schema for function
app/
  routes/                     ← Minimal Remix routes (OAuth, app install) — not the focus
shopify.app.toml              ← App-level manifest (app ID, name, scopes)
```

**The function (`extensions/hide-pickup-for-clients/src/index.js`) is the entire product.** The Remix app shell is boilerplate required by Shopify CLI.

### Function Logic

The function receives `input.cart` at checkout time and:
1. Reads `input.cart.buyerIdentity.customer.tags`
2. If `Client_NoPickup` is present, returns hide operations for all delivery options with `code === "PICK_UP"` or titles matching "pickup" / "pick up" / "รับสินค้า" (Thai)
3. Otherwise returns `{ operations: [] }` (no change)

### Deployment & Activation

Deployment is a two-step process:
1. `shopify app deploy` — compiles and registers the function, outputs a function ID (`gid://shopify/ShopifyFunction/...`)
2. Run Laravel Artisan command in the `shopify-api` repo to activate it per-store:
   ```bash
   php artisan welfare:activate-pickup-restriction --store=twcwelfare --function-id=gid://shopify/ShopifyFunction/xxxxx
   ```
   This calls the `deliveryCustomizationCreate` GraphQL mutation on the target store. Currently only `twcwelfare` store requires activation.

## Testing

| Scenario | Expected |
|---|---|
| Guest checkout | Pickup shown normally |
| Employee customer (no tag) | Pickup shown normally |
| Client user (`Client_NoPickup` tag) | Pickup hidden |

Test locally before deploying with `shopify app function run` — paste sample input JSON with customer tags including/excluding `Client_NoPickup`.

## Gemini CLI — Large-Context Research

Use Gemini CLI as a **read-only context synthesizer** when the local codebase or docs are too large to load directly.

```bash
# Plan approach for a task by analyzing the repo
./scripts/gemini-context.sh query-plan --task "Plan a query for user retention"

# Summarize docs or markdown files
./scripts/gemini-context.sh doc-review --task "Summarize all auth-related docs"

# Find how a pattern/concept is implemented across the repo
./scripts/gemini-context.sh repo-pattern --task "Find how caching is implemented"
```

**Use Gemini when:**
- Reading many files across the repo at once
- Comparing patterns across multiple directories
- Summarizing past reports or docs
- Planning from large local context

**Do not use Gemini for:**
- Executing commands or running tests
- Modifying files
- Final business or architectural judgment

Always review Gemini output before acting on it. Claude makes the final call.

## Reference

Full implementation plan with code examples: `docs/shopify-delivery-customization-app-plan.md`
