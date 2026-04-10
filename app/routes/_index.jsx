// Minimal index route — this app is function-only; no meaningful UI needed.
export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Shopify Delivery Customization</h1>
      <p>
        This app hides local pickup options at checkout for customers tagged{" "}
        <code>Client_NoPickup</code>.
      </p>
      <p>The function runs server-side via Shopify Functions (WebAssembly).</p>
    </div>
  );
}
