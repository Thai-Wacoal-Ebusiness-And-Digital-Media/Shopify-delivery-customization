import { redirect } from "@remix-run/node";
import { login } from "../shopify.server";

// Redirect root visits to the Shopify OAuth login flow
export async function loader({ request }) {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    throw redirect(`/auth?${url.searchParams.toString()}`);
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
