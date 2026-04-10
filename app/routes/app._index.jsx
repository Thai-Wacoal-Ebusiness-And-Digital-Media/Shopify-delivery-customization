// Protected app index — only reachable after Shopify OAuth
export default function AppIndex() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Delivery Customization Active</h1>
      <p>
        The <strong>Hide Pickup for Client Users</strong> function is deployed
        and running on your store.
      </p>
      <p>
        Customers tagged <code>Client_NoPickup</code> will not see local pickup
        options at checkout.
      </p>
    </div>
  );
}
