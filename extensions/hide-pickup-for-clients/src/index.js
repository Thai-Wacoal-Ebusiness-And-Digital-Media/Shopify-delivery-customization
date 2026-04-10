// @ts-check

/**
 * Shopify Delivery Customization Function
 * Hides all local pickup options for customers tagged "Client_NoPickup".
 *
 * These are Wacoal welfare client users (external partners registered via
 * campaign code) who are not permitted to enter the factory compound for pickup.
 *
 * Input object shape is defined by Shopify's function API (see src/run.graphql):
 *   input.cart.buyerIdentity.customer  — customer context (null for guests)
 *   input.cart.deliveryGroups          — array of delivery groups with options
 */
export default function run(input) {
  const customerTags = input.cart?.buyerIdentity?.customer?.tags ?? [];

  // Guests and non-client employees see pickup normally
  if (!customerTags.includes("Client_NoPickup")) {
    return { operations: [] };
  }

  // Hide all local-pickup delivery options across all delivery groups
  const hideOperations = input.cart.deliveryGroups.flatMap((group) =>
    group.deliveryOptions
      .filter(
        (option) =>
          option.code === "PICK_UP" ||
          option.title?.toLowerCase().includes("pickup") ||
          option.title?.toLowerCase().includes("pick up") ||
          option.title?.toLowerCase().includes("รับสินค้า") // Thai label fallback
      )
      .map((option) => ({
        hide: { deliveryOptionHandle: option.handle },
      }))
  );

  return { operations: hideOperations };
}
