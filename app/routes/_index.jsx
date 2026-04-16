import { redirect } from "@remix-run/node";
import { login } from "../shopify.server";

// Redirect root visits into the embedded app route.
// app.jsx's authenticate.admin handles auth from there.
//
// IMPORTANT: forward ALL Shopify query params (shop, host, id_token, embedded,
// etc.) untouched. The library checks for `embedded=1` to know the app is
// running inside the Shopify admin iframe — dropping it causes
// ensureAppIsEmbeddedIfRequired to fire on every load, redirecting the iframe
// to admin.shopify.com in an infinite loop that produces a blank page.
//
// The one exception: strip stale OAuth params (code, state) that Shopify
// appends after the OAuth callback, since forwarding those would re-trigger
// the OAuth flow.
export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (shop) {
    // Copy all params, then remove OAuth-only params that must not be forwarded.
    const params = new URLSearchParams(url.searchParams);
    params.delete("code");
    params.delete("state");
    params.delete("hmac");
    params.delete("timestamp");
    throw redirect(`/app?${params.toString()}`);
  }
  return login(request);
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Shopify Delivery Customization</h1>
      <p>Install this app on a Shopify store to get started.</p>
    </div>
  );
}
