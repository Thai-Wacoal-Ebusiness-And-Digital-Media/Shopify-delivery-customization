// @ts-check
/**
 * Shopify Delivery Customization Function
 * Hides all local pickup options for customers tagged Client_NoPickup.
 *
 * Uses hasAnyTag() because the Shopify Functions API does not expose
 * customer.tags directly.
 */
export default function run(input) {
  const isClientNoPickup =
    input.cart?.buyerIdentity?.customer?.hasAnyTag ?? false;

  if (!isClientNoPickup) {
    return { operations: [] };
  }

  const hideOperations = input.cart.deliveryGroups.flatMap((group) =>
    group.deliveryOptions
      .filter(
        (option) =>
          option.deliveryMethodType === "PICK_UP" ||
          option.title?.toLowerCase().includes("pickup") ||
          option.title?.toLowerCase().includes("pick up") ||
          option.title?.toLowerCase().includes("รับสินค้า")
      )
      .map((option) => ({
        hide: { deliveryOptionHandle: option.handle },
      }))
  );

  return { operations: hideOperations };
}
