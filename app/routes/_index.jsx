import { redirect } from "@remix-run/node";
import { login } from "../shopify.server";

// Redirect root visits into the embedded app route.
// app.jsx's authenticate.admin will handle auth — redirecting to /auth if
// no session exists, or rendering the app if a session is found.
// Passing only shop+host avoids forwarding stale OAuth params (code, state)
// that would trigger a new OAuth flow on every post-callback redirect.
export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (shop) {
    const params = new URLSearchParams({ shop });
    const host = url.searchParams.get("host");
    if (host) params.set("host", host);
    const idToken = url.searchParams.get("id_token");
    if (idToken) params.set("id_token", idToken);
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
