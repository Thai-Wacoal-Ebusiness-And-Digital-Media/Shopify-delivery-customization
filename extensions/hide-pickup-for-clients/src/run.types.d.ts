export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Represents an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)-encoded date string.
   * For example, September 7, 2019 is represented as `"2019-07-16"`.
   */
  Date: { input: any; output: any; }
  /**
   * Represents an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)-encoded date and time string.
   * For example, 3:50 pm on September 7, 2019 in the time zone of UTC (Coordinated Universal Time) is
   * represented as `"2019-09-07T15:50:00Z`".
   */
  DateTime: { input: any; output: any; }
  /**
   * A subset of the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format that
   * includes the date and time but not the timezone which is determined from context.
   *
   * For example, "2018-01-01T00:00:00".
   */
  DateTimeWithoutTimezone: { input: any; output: any; }
  /**
   * A signed decimal number, which supports arbitrary precision and is serialized as a string.
   *
   * Example values: `"29.99"`, `"29.999"`.
   */
  Decimal: { input: any; output: any; }
  /**
   * A function-scoped handle to a refer a resource.
   * The Handle type appears in a JSON response as a String, but it is not intended to be human-readable.
   * Example value: `"10079785100"`
   */
  Handle: { input: any; output: any; }
  /**
   * A [JSON](https://www.json.org/json-en.html) object.
   *
   * Example value:
   * `{
   *   "product": {
   *     "id": "gid://shopify/Product/1346443542550",
   *     "title": "White T-shirt",
   *     "options": [{
   *       "name": "Size",
   *       "values": ["M", "L"]
   *     }]
   *   }
   * }`
   */
  JSON: { input: any; output: any; }
  /**
   * A subset of the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format that
   * includes the time but not the date or timezone which is determined from context.
   * For example, "05:43:21".
   */
  TimeWithoutTimezone: { input: any; output: any; }
  /** A void type that can be used to return a null value from a mutation. */
  Void: { input: any; output: any; }
}

/**
 * A custom property. Attributes are used to store additional information about a Shopify resource, such as
 * products, customers, or orders. Attributes are stored as key-value pairs.
 *
 * For example, a list of attributes might include whether a customer is a first-time buyer (`"customer_first_order": "true"`),
 * whether an order is gift-wrapped (`"gift_wrapped": "true"`), a preferred delivery date
 * (`"preferred_delivery_date": "2025-10-01"`), the discount applied (`"loyalty_discount_applied": "10%"`), and any
 * notes provided by the customer (`"customer_notes": "Please leave at the front door"`).
 */
export interface Attribute {
  __typename?: 'Attribute';
  /** The key or name of the attribute. For example, `"customer_first_order"`. */
  key: Scalars['String']['output'];
  /** The value of the attribute. For example, `"true"`. */
  value: Maybe<Scalars['String']['output']>;
}

/**
 * Information about the customer that's interacting with the cart. It includes details such as the
 * customer's email and phone number, and the total amount of money the customer has spent in the store.
 * This information helps personalize the checkout experience and ensures that accurate pricing and delivery options
 * are displayed to customers.
 */
export interface BuyerIdentity {
  __typename?: 'BuyerIdentity';
  /**
   * The customer that's interacting with the cart. A customer is a buyer who has an
   * [account](https://help.shopify.com/manual/customers/customer-accounts) with the store.
   */
  customer: Maybe<Customer>;
  /** The email address of the customer that's interacting with the cart. */
  email: Maybe<Scalars['String']['output']>;
  /**
   * Whether the customer is authenticated through their
   * [customer account](https://help.shopify.com/manual/customers/customer-accounts).
   * If the customer is authenticated, then the `customer` field returns the customer's information.
   * If the customer isn't authenticated, then the `customer` field returns `null`.
   */
  isAuthenticated: Scalars['Boolean']['output'];
  /** The phone number of the customer that's interacting with the cart. */
  phone: Maybe<Scalars['String']['output']>;
  /**
   * The company of a B2B customer that's interacting with the cart.
   * Used to manage and track purchases made by businesses rather than individual customers.
   */
  purchasingCompany: Maybe<PurchasingCompany>;
}

/**
 * The cart where the Function is running. A cart contains the merchandise that a customer intends to purchase
 * and information about the customer, such as the customer's email address and phone number.
 */
export interface Cart {
  __typename?: 'Cart';
  /**
   * The custom attributes associated with a cart to store additional information. Cart attributes
   * allow you to collect specific information from customers on the **Cart** page, such as order notes,
   * gift wrapping requests, or custom product details. Attributes are stored as key-value pairs.
   */
  attribute: Maybe<Attribute>;
  /**
   * Information about the customer that's interacting with the cart. It includes details such as the
   * customer's email and phone number, and the total amount of money the customer has spent in the store.
   * This information helps personalize the checkout experience and ensures that accurate pricing and delivery options
   * are displayed to customers.
   */
  buyerIdentity: Maybe<BuyerIdentity>;
  /**
   * A breakdown of the costs that the customer will pay at checkout. It includes the total amount,
   * the subtotal before taxes and duties, the tax amount, and duty charges.
   */
  cost: CartCost;
  /** The items in a cart that are eligible for fulfillment and can be delivered to the customer. */
  deliverableLines: Array<DeliverableCartLine>;
  /**
   * A collection of items that are grouped by shared delivery characteristics. Delivery groups streamline
   * fulfillment by organizing items that can be shipped together, based on the customer's
   * shipping address. For example, if a customer orders a t-shirt and a pair of shoes that can be shipped
   * together, then the items are included in the same delivery group.
   *
   * In the [Order Discount](https://shopify.dev/docs/api/functions/reference/order-discounts) and
   * [Product Discount](https://shopify.dev/docs/api/functions/reference/product-discounts) legacy APIs,
   * the `cart.deliveryGroups` input is always an empty array. This means you can't access delivery groups when
   * creating Order Discount or Product Discount Functions. If you need to apply discounts to shipping costs,
   * then use the [Discount Function API](https://shopify.dev/docs/api/functions/reference/discount)
   * instead.
   */
  deliveryGroups: Array<CartDeliveryGroup>;
  /**
   * The items in a cart that the customer intends to purchase. A cart line is an entry in the
   * customer's cart that represents a single unit of a product variant. For example, if a customer adds two
   * different sizes of the same t-shirt to their cart, then each size is represented as a separate cart line.
   */
  lines: Array<CartLine>;
  /**
   * The additional fields on the **Cart** page that are required for international orders in specific countries,
   * such as customs information or tax identification numbers.
   */
  localizedFields: Array<LocalizedField>;
}


/**
 * The cart where the Function is running. A cart contains the merchandise that a customer intends to purchase
 * and information about the customer, such as the customer's email address and phone number.
 */
export interface CartAttributeArgs {
  key: InputMaybe<Scalars['String']['input']>;
}


/**
 * The cart where the Function is running. A cart contains the merchandise that a customer intends to purchase
 * and information about the customer, such as the customer's email address and phone number.
 */
export interface CartLocalizedFieldsArgs {
  keys?: Array<LocalizedFieldKey>;
}

/**
 * A breakdown of the costs that the customer will pay at checkout. It includes the total amount,
 * the subtotal before taxes and duties, the tax amount, and duty charges.
 */
export interface CartCost {
  __typename?: 'CartCost';
  /** The amount for the customer to pay at checkout, excluding taxes and discounts. */
  subtotalAmount: MoneyV2;
  /** The total amount for the customer to pay at checkout. */
  totalAmount: MoneyV2;
  /** The duty charges for a customer to pay at checkout. */
  totalDutyAmount: Maybe<MoneyV2>;
  /** The total tax amount for the customer to pay at checkout. */
  totalTaxAmount: Maybe<MoneyV2>;
}

/**
 * Information about items in a cart that are grouped by shared delivery characteristics.
 * Delivery groups streamline fulfillment by organizing items that can be shipped together, based on the customer's
 * shipping address. For example, if a customer orders a t-shirt and a pair of shoes that can be shipped
 * together, then the items are included in the same delivery group.
 */
export interface CartDeliveryGroup {
  __typename?: 'CartDeliveryGroup';
  /**
   * Information about items in a cart that a customer intends to purchase. A cart line is an entry in the
   * customer's cart that represents a single unit of a product variant. For example, if a customer adds two
   * different sizes of the same t-shirt to their cart, then each size is represented as a separate cart line.
   */
  cartLines: Array<CartLine>;
  /** The shipping or destination address associated with the delivery group. */
  deliveryAddress: Maybe<MailingAddress>;
  /**
   * The delivery options available for the delivery group. Delivery options are the different ways that customers
   * can choose to have their orders shipped. Examples include express shipping or standard shipping.
   */
  deliveryOptions: Array<CartDeliveryOption>;
  /**
   * A [globally-unique ID](https://shopify.dev/docs/api/usage/gids)
   * for the delivery group.
   */
  id: Scalars['ID']['output'];
  /** Information about the delivery option that the customer has selected. */
  selectedDeliveryOption: Maybe<CartDeliveryOption>;
}

/**
 * Information about a delivery option that's available for an item in a cart. Delivery options are the different
 * ways that customers can choose to have their orders shipped. Examples include express shipping or standard
 * shipping.
 */
export interface CartDeliveryOption {
  __typename?: 'CartDeliveryOption';
  /**
   * A unique identifier that represents the delivery option offered to customers.
   * For example, `Canada Post Expedited`.
   */
  code: Maybe<Scalars['String']['output']>;
  /** The amount that the customer pays if they select the delivery option. */
  cost: MoneyV2;
  /**
   * The delivery method associated with the delivery option. A delivery method is a way that merchants can
   * fulfill orders from their online stores. Delivery methods include shipping to an address,
   * [local pickup](https://help.shopify.com/manual/fulfillment/setup/delivery-methods/pickup-in-store),
   * and shipping to a [pickup point](https://help.shopify.com/manual/fulfillment/shopify-shipping/pickup-points),
   * all of which are natively supported by Shopify checkout.
   */
  deliveryMethodType: DeliveryMethod;
  /** A single-line description of the delivery option, with HTML tags removed. */
  description: Maybe<Scalars['String']['output']>;
  /**
   * A unique, human-readable identifier of the delivery option's title.
   * A handle can contain letters, hyphens (`-`), and numbers, but not spaces.
   * For example, `standard-shipping`.
   */
  handle: Scalars['Handle']['output'];
  /**
   * The name of the delivery option that displays to customers. The title is used to construct the delivery
   * option's handle. For example, if a delivery option is titled "Standard Shipping", then the handle is
   * `standard-shipping`.
   */
  title: Maybe<Scalars['String']['output']>;
}

/**
 * Information about an item in a cart that a customer intends to purchase. A cart line is an entry in the
 * customer's cart that represents a single unit of a product variant. For example, if a customer adds two
 * different sizes of the same t-shirt to their cart, then each size is represented as a separate cart line.
 */
export interface CartLine {
  __typename?: 'CartLine';
  /**
   * The custom attributes associated with a cart to store additional information. Cart attributes
   * allow you to collect specific information from customers on the **Cart** page, such as order notes,
   * gift wrapping requests, or custom product details. Attributes are stored as key-value pairs.
   *
   * Cart line attributes are equivalent to the
   * [`line_item`](https://shopify.dev/docs/apps/build/purchase-options/subscriptions/selling-plans)
   * object in Liquid.
   */
  attribute: Maybe<Attribute>;
  /**
   * The cost of an item in a cart that the customer intends to purchase. Cart lines are entries in the customer's
   * cart that represent a single unit of a product variant. For example, if a customer adds two different sizes of
   * the same t-shirt to their cart, then each size is represented as a separate cart line.
   */
  cost: CartLineCost;
  /** The ID of the cart line. */
  id: Scalars['ID']['output'];
  /** The item that the customer intends to purchase. */
  merchandise: Merchandise;
  /** The quantity of the item that the customer intends to purchase. */
  quantity: Scalars['Int']['output'];
  /**
   * The [selling plan](https://shopify.dev/docs/apps/build/purchase-options/subscriptions/selling-plans)
   * associated with the cart line, including information about how a product variant can be sold and purchased.
   */
  sellingPlanAllocation: Maybe<SellingPlanAllocation>;
}


/**
 * Information about an item in a cart that a customer intends to purchase. A cart line is an entry in the
 * customer's cart that represents a single unit of a product variant. For example, if a customer adds two
 * different sizes of the same t-shirt to their cart, then each size is represented as a separate cart line.
 */
export interface CartLineAttributeArgs {
  key: InputMaybe<Scalars['String']['input']>;
}

/**
 * The cost of an item in a cart that the customer intends to purchase. Cart lines are entries in the customer's
 * cart that represent a single unit of a product variant. For example, if a customer adds two different sizes of
 * the same t-shirt to their cart, then each size is represented as a separate cart line.
 */
export interface CartLineCost {
  __typename?: 'CartLineCost';
  /**
   * The cost of a single unit. For example, if a customer purchases three units of a product
   * that are priced at $10 each, then the `amountPerQuantity` is $10.
   */
  amountPerQuantity: MoneyV2;
  /**
   * The cost of a single unit before any discounts are applied. This field is used to calculate and display
   * savings for customers. For example, if a product's `compareAtAmountPerQuantity` is $25 and its current price
   * is $20, then the customer sees a $5 discount. This value can change based on the buyer's identity and is
   * `null` when the value is hidden from buyers.
   */
  compareAtAmountPerQuantity: Maybe<MoneyV2>;
  /**
   * The cost of items in the cart before applying any discounts to certain items.
   * This amount serves as the starting point for calculating any potential savings customers
   * might receive through promotions or discounts.
   */
  subtotalAmount: MoneyV2;
  /** The total cost of items in a cart. */
  totalAmount: MoneyV2;
}

/**
 * Whether the product is in the specified collection.
 *
 * A collection is a group of products that can be displayed in online stores and other sales channels in
 * categories, which makes it easy for customers to find them. For example, an athletics store might create
 * different collections for running attire and accessories.
 */
export interface CollectionMembership {
  __typename?: 'CollectionMembership';
  /**
   * A [globally-unique ID](https://shopify.dev/docs/api/usage/gids)
   * for the collection.
   */
  collectionId: Scalars['ID']['output'];
  /** Whether the product is in the specified collection. */
  isMember: Scalars['Boolean']['output'];
}

/** Represents information about a company which is also a customer of the shop. */
export interface Company extends HasMetafields {
  __typename?: 'Company';
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was created in Shopify. */
  createdAt: Scalars['DateTime']['output'];
  /** A unique externally-supplied ID for the company. */
  externalId: Maybe<Scalars['String']['output']>;
  /** The ID of the company. */
  id: Scalars['ID']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield: Maybe<Metafield>;
  /** The name of the company. */
  name: Scalars['String']['output'];
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was last modified. */
  updatedAt: Scalars['DateTime']['output'];
}


/** Represents information about a company which is also a customer of the shop. */
export interface CompanyMetafieldArgs {
  key: Scalars['String']['input'];
  namespace: InputMaybe<Scalars['String']['input']>;
}

/** A company's main point of contact. */
export interface CompanyContact {
  __typename?: 'CompanyContact';
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company contact was created in Shopify.
   */
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the company. */
  id: Scalars['ID']['output'];
  /** The company contact's locale (language). */
  locale: Maybe<Scalars['String']['output']>;
  /** The company contact's job title. */
  title: Maybe<Scalars['String']['output']>;
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company contact was last modified.
   */
  updatedAt: Scalars['DateTime']['output'];
}

/** A company's location. */
export interface CompanyLocation extends HasMetafields {
  __typename?: 'CompanyLocation';
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company location was created in Shopify.
   */
  createdAt: Scalars['DateTime']['output'];
  /** A unique externally-supplied ID for the company. */
  externalId: Maybe<Scalars['String']['output']>;
  /** The ID of the company. */
  id: Scalars['ID']['output'];
  /** The preferred locale of the company location. */
  locale: Maybe<Scalars['String']['output']>;
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield: Maybe<Metafield>;
  /** The name of the company location. */
  name: Scalars['String']['output'];
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company location was last modified.
   */
  updatedAt: Scalars['DateTime']['output'];
}


/** A company's location. */
export interface CompanyLocationMetafieldArgs {
  key: Scalars['String']['input'];
  namespace: InputMaybe<Scalars['String']['input']>;
}

/**
 * The country for which the store is customized, reflecting local preferences and regulations.
 * Localization might influence the language, currency, and product offerings available in a store to enhance
 * the shopping experience for customers in that region.
 */
export interface Country {
  __typename?: 'Country';
  /** The ISO code of the country. */
  isoCode: CountryCode;
}

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
 */
export type CountryCode =
  /** Ascension Island. */
  | 'AC'
  /** Andorra. */
  | 'AD'
  /** United Arab Emirates. */
  | 'AE'
  /** Afghanistan. */
  | 'AF'
  /** Antigua & Barbuda. */
  | 'AG'
  /** Anguilla. */
  | 'AI'
  /** Albania. */
  | 'AL'
  /** Armenia. */
  | 'AM'
  /** Netherlands Antilles. */
  | 'AN'
  /** Angola. */
  | 'AO'
  /** Argentina. */
  | 'AR'
  /** Austria. */
  | 'AT'
  /** Australia. */
  | 'AU'
  /** Aruba. */
  | 'AW'
  /** Åland Islands. */
  | 'AX'
  /** Azerbaijan. */
  | 'AZ'
  /** Bosnia & Herzegovina. */
  | 'BA'
  /** Barbados. */
  | 'BB'
  /** Bangladesh. */
  | 'BD'
  /** Belgium. */
  | 'BE'
  /** Burkina Faso. */
  | 'BF'
  /** Bulgaria. */
  | 'BG'
  /** Bahrain. */
  | 'BH'
  /** Burundi. */
  | 'BI'
  /** Benin. */
  | 'BJ'
  /** St. Barthélemy. */
  | 'BL'
  /** Bermuda. */
  | 'BM'
  /** Brunei. */
  | 'BN'
  /** Bolivia. */
  | 'BO'
  /** Caribbean Netherlands. */
  | 'BQ'
  /** Brazil. */
  | 'BR'
  /** Bahamas. */
  | 'BS'
  /** Bhutan. */
  | 'BT'
  /** Bouvet Island. */
  | 'BV'
  /** Botswana. */
  | 'BW'
  /** Belarus. */
  | 'BY'
  /** Belize. */
  | 'BZ'
  /** Canada. */
  | 'CA'
  /** Cocos (Keeling) Islands. */
  | 'CC'
  /** Congo - Kinshasa. */
  | 'CD'
  /** Central African Republic. */
  | 'CF'
  /** Congo - Brazzaville. */
  | 'CG'
  /** Switzerland. */
  | 'CH'
  /** Côte d’Ivoire. */
  | 'CI'
  /** Cook Islands. */
  | 'CK'
  /** Chile. */
  | 'CL'
  /** Cameroon. */
  | 'CM'
  /** China. */
  | 'CN'
  /** Colombia. */
  | 'CO'
  /** Costa Rica. */
  | 'CR'
  /** Cuba. */
  | 'CU'
  /** Cape Verde. */
  | 'CV'
  /** Curaçao. */
  | 'CW'
  /** Christmas Island. */
  | 'CX'
  /** Cyprus. */
  | 'CY'
  /** Czechia. */
  | 'CZ'
  /** Germany. */
  | 'DE'
  /** Djibouti. */
  | 'DJ'
  /** Denmark. */
  | 'DK'
  /** Dominica. */
  | 'DM'
  /** Dominican Republic. */
  | 'DO'
  /** Algeria. */
  | 'DZ'
  /** Ecuador. */
  | 'EC'
  /** Estonia. */
  | 'EE'
  /** Egypt. */
  | 'EG'
  /** Western Sahara. */
  | 'EH'
  /** Eritrea. */
  | 'ER'
  /** Spain. */
  | 'ES'
  /** Ethiopia. */
  | 'ET'
  /** Finland. */
  | 'FI'
  /** Fiji. */
  | 'FJ'
  /** Falkland Islands. */
  | 'FK'
  /** Faroe Islands. */
  | 'FO'
  /** France. */
  | 'FR'
  /** Gabon. */
  | 'GA'
  /** United Kingdom. */
  | 'GB'
  /** Grenada. */
  | 'GD'
  /** Georgia. */
  | 'GE'
  /** French Guiana. */
  | 'GF'
  /** Guernsey. */
  | 'GG'
  /** Ghana. */
  | 'GH'
  /** Gibraltar. */
  | 'GI'
  /** Greenland. */
  | 'GL'
  /** Gambia. */
  | 'GM'
  /** Guinea. */
  | 'GN'
  /** Guadeloupe. */
  | 'GP'
  /** Equatorial Guinea. */
  | 'GQ'
  /** Greece. */
  | 'GR'
  /** South Georgia & South Sandwich Islands. */
  | 'GS'
  /** Guatemala. */
  | 'GT'
  /** Guinea-Bissau. */
  | 'GW'
  /** Guyana. */
  | 'GY'
  /** Hong Kong SAR. */
  | 'HK'
  /** Heard & McDonald Islands. */
  | 'HM'
  /** Honduras. */
  | 'HN'
  /** Croatia. */
  | 'HR'
  /** Haiti. */
  | 'HT'
  /** Hungary. */
  | 'HU'
  /** Indonesia. */
  | 'ID'
  /** Ireland. */
  | 'IE'
  /** Israel. */
  | 'IL'
  /** Isle of Man. */
  | 'IM'
  /** India. */
  | 'IN'
  /** British Indian Ocean Territory. */
  | 'IO'
  /** Iraq. */
  | 'IQ'
  /** Iran. */
  | 'IR'
  /** Iceland. */
  | 'IS'
  /** Italy. */
  | 'IT'
  /** Jersey. */
  | 'JE'
  /** Jamaica. */
  | 'JM'
  /** Jordan. */
  | 'JO'
  /** Japan. */
  | 'JP'
  /** Kenya. */
  | 'KE'
  /** Kyrgyzstan. */
  | 'KG'
  /** Cambodia. */
  | 'KH'
  /** Kiribati. */
  | 'KI'
  /** Comoros. */
  | 'KM'
  /** St. Kitts & Nevis. */
  | 'KN'
  /** North Korea. */
  | 'KP'
  /** South Korea. */
  | 'KR'
  /** Kuwait. */
  | 'KW'
  /** Cayman Islands. */
  | 'KY'
  /** Kazakhstan. */
  | 'KZ'
  /** Laos. */
  | 'LA'
  /** Lebanon. */
  | 'LB'
  /** St. Lucia. */
  | 'LC'
  /** Liechtenstein. */
  | 'LI'
  /** Sri Lanka. */
  | 'LK'
  /** Liberia. */
  | 'LR'
  /** Lesotho. */
  | 'LS'
  /** Lithuania. */
  | 'LT'
  /** Luxembourg. */
  | 'LU'
  /** Latvia. */
  | 'LV'
  /** Libya. */
  | 'LY'
  /** Morocco. */
  | 'MA'
  /** Monaco. */
  | 'MC'
  /** Moldova. */
  | 'MD'
  /** Montenegro. */
  | 'ME'
  /** St. Martin. */
  | 'MF'
  /** Madagascar. */
  | 'MG'
  /** North Macedonia. */
  | 'MK'
  /** Mali. */
  | 'ML'
  /** Myanmar (Burma). */
  | 'MM'
  /** Mongolia. */
  | 'MN'
  /** Macao SAR. */
  | 'MO'
  /** Martinique. */
  | 'MQ'
  /** Mauritania. */
  | 'MR'
  /** Montserrat. */
  | 'MS'
  /** Malta. */
  | 'MT'
  /** Mauritius. */
  | 'MU'
  /** Maldives. */
  | 'MV'
  /** Malawi. */
  | 'MW'
  /** Mexico. */
  | 'MX'
  /** Malaysia. */
  | 'MY'
  /** Mozambique. */
  | 'MZ'
  /** Namibia. */
  | 'NA'
  /** New Caledonia. */
  | 'NC'
  /** Niger. */
  | 'NE'
  /** Norfolk Island. */
  | 'NF'
  /** Nigeria. */
  | 'NG'
  /** Nicaragua. */
  | 'NI'
  /** Netherlands. */
  | 'NL'
  /** Norway. */
  | 'NO'
  /** Nepal. */
  | 'NP'
  /** Nauru. */
  | 'NR'
  /** Niue. */
  | 'NU'
  /** New Zealand. */
  | 'NZ'
  /** Oman. */
  | 'OM'
  /** Panama. */
  | 'PA'
  /** Peru. */
  | 'PE'
  /** French Polynesia. */
  | 'PF'
  /** Papua New Guinea. */
  | 'PG'
  /** Philippines. */
  | 'PH'
  /** Pakistan. */
  | 'PK'
  /** Poland. */
  | 'PL'
  /** St. Pierre & Miquelon. */
  | 'PM'
  /** Pitcairn Islands. */
  | 'PN'
  /** Palestinian Territories. */
  | 'PS'
  /** Portugal. */
  | 'PT'
  /** Paraguay. */
  | 'PY'
  /** Qatar. */
  | 'QA'
  /** Réunion. */
  | 'RE'
  /** Romania. */
  | 'RO'
  /** Serbia. */
  | 'RS'
  /** Russia. */
  | 'RU'
  /** Rwanda. */
  | 'RW'
  /** Saudi Arabia. */
  | 'SA'
  /** Solomon Islands. */
  | 'SB'
  /** Seychelles. */
  | 'SC'
  /** Sudan. */
  | 'SD'
  /** Sweden. */
  | 'SE'
  /** Singapore. */
  | 'SG'
  /** St. Helena. */
  | 'SH'
  /** Slovenia. */
  | 'SI'
  /** Svalbard & Jan Mayen. */
  | 'SJ'
  /** Slovakia. */
  | 'SK'
  /** Sierra Leone. */
  | 'SL'
  /** San Marino. */
  | 'SM'
  /** Senegal. */
  | 'SN'
  /** Somalia. */
  | 'SO'
  /** Suriname. */
  | 'SR'
  /** South Sudan. */
  | 'SS'
  /** São Tomé & Príncipe. */
  | 'ST'
  /** El Salvador. */
  | 'SV'
  /** Sint Maarten. */
  | 'SX'
  /** Syria. */
  | 'SY'
  /** Eswatini. */
  | 'SZ'
  /** Tristan da Cunha. */
  | 'TA'
  /** Turks & Caicos Islands. */
  | 'TC'
  /** Chad. */
  | 'TD'
  /** French Southern Territories. */
  | 'TF'
  /** Togo. */
  | 'TG'
  /** Thailand. */
  | 'TH'
  /** Tajikistan. */
  | 'TJ'
  /** Tokelau. */
  | 'TK'
  /** Timor-Leste. */
  | 'TL'
  /** Turkmenistan. */
  | 'TM'
  /** Tunisia. */
  | 'TN'
  /** Tonga. */
  | 'TO'
  /** Türkiye. */
  | 'TR'
  /** Trinidad & Tobago. */
  | 'TT'
  /** Tuvalu. */
  | 'TV'
  /** Taiwan. */
  | 'TW'
  /** Tanzania. */
  | 'TZ'
  /** Ukraine. */
  | 'UA'
  /** Uganda. */
  | 'UG'
  /** U.S. Outlying Islands. */
  | 'UM'
  /** United States. */
  | 'US'
  /** Uruguay. */
  | 'UY'
  /** Uzbekistan. */
  | 'UZ'
  /** Vatican City. */
  | 'VA'
  /** St. Vincent & Grenadines. */
  | 'VC'
  /** Venezuela. */
  | 'VE'
  /** British Virgin Islands. */
  | 'VG'
  /** Vietnam. */
  | 'VN'
  /** Vanuatu. */
  | 'VU'
  /** Wallis & Futuna. */
  | 'WF'
  /** Samoa. */
  | 'WS'
  /** Kosovo. */
  | 'XK'
  /** Yemen. */
  | 'YE'
  /** Mayotte. */
  | 'YT'
  /** South Africa. */
  | 'ZA'
  /** Zambia. */
  | 'ZM'
  /** Zimbabwe. */
  | 'ZW'
  /** Unknown Region. */
  | 'ZZ';

/**
 * The currency codes that represent the world currencies throughout the Admin API. Currency codes include
 * [standard ISO 4217 codes](https://en.wikipedia.org/wiki/ISO_4217), legacy codes, non-standard codes,
 * digital currency codes.
 */
export type CurrencyCode =
  /** United Arab Emirates Dirham (AED). */
  | 'AED'
  /** Afghan Afghani (AFN). */
  | 'AFN'
  /** Albanian Lek (ALL). */
  | 'ALL'
  /** Armenian Dram (AMD). */
  | 'AMD'
  /** Netherlands Antillean Guilder. */
  | 'ANG'
  /** Angolan Kwanza (AOA). */
  | 'AOA'
  /** Argentine Pesos (ARS). */
  | 'ARS'
  /** Australian Dollars (AUD). */
  | 'AUD'
  /** Aruban Florin (AWG). */
  | 'AWG'
  /** Azerbaijani Manat (AZN). */
  | 'AZN'
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  | 'BAM'
  /** Barbadian Dollar (BBD). */
  | 'BBD'
  /** Bangladesh Taka (BDT). */
  | 'BDT'
  /** Bulgarian Lev (BGN). */
  | 'BGN'
  /** Bahraini Dinar (BHD). */
  | 'BHD'
  /** Burundian Franc (BIF). */
  | 'BIF'
  /** Bermudian Dollar (BMD). */
  | 'BMD'
  /** Brunei Dollar (BND). */
  | 'BND'
  /** Bolivian Boliviano (BOB). */
  | 'BOB'
  /** Brazilian Real (BRL). */
  | 'BRL'
  /** Bahamian Dollar (BSD). */
  | 'BSD'
  /** Bhutanese Ngultrum (BTN). */
  | 'BTN'
  /** Botswana Pula (BWP). */
  | 'BWP'
  /** Belarusian Ruble (BYN). */
  | 'BYN'
  /** Belarusian Ruble (BYR). */
  | 'BYR'
  /** Belize Dollar (BZD). */
  | 'BZD'
  /** Canadian Dollars (CAD). */
  | 'CAD'
  /** Congolese franc (CDF). */
  | 'CDF'
  /** Swiss Francs (CHF). */
  | 'CHF'
  /** Chilean Peso (CLP). */
  | 'CLP'
  /** Chinese Yuan Renminbi (CNY). */
  | 'CNY'
  /** Colombian Peso (COP). */
  | 'COP'
  /** Costa Rican Colones (CRC). */
  | 'CRC'
  /** Cape Verdean escudo (CVE). */
  | 'CVE'
  /** Czech Koruny (CZK). */
  | 'CZK'
  /** Djiboutian Franc (DJF). */
  | 'DJF'
  /** Danish Kroner (DKK). */
  | 'DKK'
  /** Dominican Peso (DOP). */
  | 'DOP'
  /** Algerian Dinar (DZD). */
  | 'DZD'
  /** Egyptian Pound (EGP). */
  | 'EGP'
  /** Eritrean Nakfa (ERN). */
  | 'ERN'
  /** Ethiopian Birr (ETB). */
  | 'ETB'
  /** Euro (EUR). */
  | 'EUR'
  /** Fijian Dollars (FJD). */
  | 'FJD'
  /** Falkland Islands Pounds (FKP). */
  | 'FKP'
  /** United Kingdom Pounds (GBP). */
  | 'GBP'
  /** Georgian Lari (GEL). */
  | 'GEL'
  /** Ghanaian Cedi (GHS). */
  | 'GHS'
  /** Gibraltar Pounds (GIP). */
  | 'GIP'
  /** Gambian Dalasi (GMD). */
  | 'GMD'
  /** Guinean Franc (GNF). */
  | 'GNF'
  /** Guatemalan Quetzal (GTQ). */
  | 'GTQ'
  /** Guyanese Dollar (GYD). */
  | 'GYD'
  /** Hong Kong Dollars (HKD). */
  | 'HKD'
  /** Honduran Lempira (HNL). */
  | 'HNL'
  /** Croatian Kuna (HRK). */
  | 'HRK'
  /** Haitian Gourde (HTG). */
  | 'HTG'
  /** Hungarian Forint (HUF). */
  | 'HUF'
  /** Indonesian Rupiah (IDR). */
  | 'IDR'
  /** Israeli New Shekel (NIS). */
  | 'ILS'
  /** Indian Rupees (INR). */
  | 'INR'
  /** Iraqi Dinar (IQD). */
  | 'IQD'
  /** Iranian Rial (IRR). */
  | 'IRR'
  /** Icelandic Kronur (ISK). */
  | 'ISK'
  /** Jersey Pound. */
  | 'JEP'
  /** Jamaican Dollars (JMD). */
  | 'JMD'
  /** Jordanian Dinar (JOD). */
  | 'JOD'
  /** Japanese Yen (JPY). */
  | 'JPY'
  /** Kenyan Shilling (KES). */
  | 'KES'
  /** Kyrgyzstani Som (KGS). */
  | 'KGS'
  /** Cambodian Riel. */
  | 'KHR'
  /** Kiribati Dollar (KID). */
  | 'KID'
  /** Comorian Franc (KMF). */
  | 'KMF'
  /** South Korean Won (KRW). */
  | 'KRW'
  /** Kuwaiti Dinar (KWD). */
  | 'KWD'
  /** Cayman Dollars (KYD). */
  | 'KYD'
  /** Kazakhstani Tenge (KZT). */
  | 'KZT'
  /** Laotian Kip (LAK). */
  | 'LAK'
  /** Lebanese Pounds (LBP). */
  | 'LBP'
  /** Sri Lankan Rupees (LKR). */
  | 'LKR'
  /** Liberian Dollar (LRD). */
  | 'LRD'
  /** Lesotho Loti (LSL). */
  | 'LSL'
  /** Lithuanian Litai (LTL). */
  | 'LTL'
  /** Latvian Lati (LVL). */
  | 'LVL'
  /** Libyan Dinar (LYD). */
  | 'LYD'
  /** Moroccan Dirham. */
  | 'MAD'
  /** Moldovan Leu (MDL). */
  | 'MDL'
  /** Malagasy Ariary (MGA). */
  | 'MGA'
  /** Macedonia Denar (MKD). */
  | 'MKD'
  /** Burmese Kyat (MMK). */
  | 'MMK'
  /** Mongolian Tugrik. */
  | 'MNT'
  /** Macanese Pataca (MOP). */
  | 'MOP'
  /** Mauritanian Ouguiya (MRU). */
  | 'MRU'
  /** Mauritian Rupee (MUR). */
  | 'MUR'
  /** Maldivian Rufiyaa (MVR). */
  | 'MVR'
  /** Malawian Kwacha (MWK). */
  | 'MWK'
  /** Mexican Pesos (MXN). */
  | 'MXN'
  /** Malaysian Ringgits (MYR). */
  | 'MYR'
  /** Mozambican Metical. */
  | 'MZN'
  /** Namibian Dollar. */
  | 'NAD'
  /** Nigerian Naira (NGN). */
  | 'NGN'
  /** Nicaraguan Córdoba (NIO). */
  | 'NIO'
  /** Norwegian Kroner (NOK). */
  | 'NOK'
  /** Nepalese Rupee (NPR). */
  | 'NPR'
  /** New Zealand Dollars (NZD). */
  | 'NZD'
  /** Omani Rial (OMR). */
  | 'OMR'
  /** Panamian Balboa (PAB). */
  | 'PAB'
  /** Peruvian Nuevo Sol (PEN). */
  | 'PEN'
  /** Papua New Guinean Kina (PGK). */
  | 'PGK'
  /** Philippine Peso (PHP). */
  | 'PHP'
  /** Pakistani Rupee (PKR). */
  | 'PKR'
  /** Polish Zlotych (PLN). */
  | 'PLN'
  /** Paraguayan Guarani (PYG). */
  | 'PYG'
  /** Qatari Rial (QAR). */
  | 'QAR'
  /** Romanian Lei (RON). */
  | 'RON'
  /** Serbian dinar (RSD). */
  | 'RSD'
  /** Russian Rubles (RUB). */
  | 'RUB'
  /** Rwandan Franc (RWF). */
  | 'RWF'
  /** Saudi Riyal (SAR). */
  | 'SAR'
  /** Solomon Islands Dollar (SBD). */
  | 'SBD'
  /** Seychellois Rupee (SCR). */
  | 'SCR'
  /** Sudanese Pound (SDG). */
  | 'SDG'
  /** Swedish Kronor (SEK). */
  | 'SEK'
  /** Singapore Dollars (SGD). */
  | 'SGD'
  /** Saint Helena Pounds (SHP). */
  | 'SHP'
  /** Sierra Leonean Leone (SLL). */
  | 'SLL'
  /** Somali Shilling (SOS). */
  | 'SOS'
  /** Surinamese Dollar (SRD). */
  | 'SRD'
  /** South Sudanese Pound (SSP). */
  | 'SSP'
  /** Sao Tome And Principe Dobra (STD). */
  | 'STD'
  /** Sao Tome And Principe Dobra (STN). */
  | 'STN'
  /** Syrian Pound (SYP). */
  | 'SYP'
  /** Swazi Lilangeni (SZL). */
  | 'SZL'
  /** Thai baht (THB). */
  | 'THB'
  /** Tajikistani Somoni (TJS). */
  | 'TJS'
  /** Turkmenistani Manat (TMT). */
  | 'TMT'
  /** Tunisian Dinar (TND). */
  | 'TND'
  /** Tongan Pa'anga (TOP). */
  | 'TOP'
  /** Turkish Lira (TRY). */
  | 'TRY'
  /** Trinidad and Tobago Dollars (TTD). */
  | 'TTD'
  /** Taiwan Dollars (TWD). */
  | 'TWD'
  /** Tanzanian Shilling (TZS). */
  | 'TZS'
  /** Ukrainian Hryvnia (UAH). */
  | 'UAH'
  /** Ugandan Shilling (UGX). */
  | 'UGX'
  /** United States Dollars (USD). */
  | 'USD'
  /** United States Dollars Coin (USDC). */
  | 'USDC'
  /** Uruguayan Pesos (UYU). */
  | 'UYU'
  /** Uzbekistan som (UZS). */
  | 'UZS'
  /** Venezuelan Bolivares (VED). */
  | 'VED'
  /** Venezuelan Bolivares (VEF). */
  | 'VEF'
  /** Venezuelan Bolivares Soberanos (VES). */
  | 'VES'
  /** Vietnamese đồng (VND). */
  | 'VND'
  /** Vanuatu Vatu (VUV). */
  | 'VUV'
  /** Samoan Tala (WST). */
  | 'WST'
  /** Central African CFA Franc (XAF). */
  | 'XAF'
  /** East Caribbean Dollar (XCD). */
  | 'XCD'
  /** West African CFA franc (XOF). */
  | 'XOF'
  /** CFP Franc (XPF). */
  | 'XPF'
  /** Unrecognized currency. */
  | 'XXX'
  /** Yemeni Rial (YER). */
  | 'YER'
  /** South African Rand (ZAR). */
  | 'ZAR'
  /** Zambian Kwacha (ZMW). */
  | 'ZMW';

/**
 * A custom product represents a product that doesn't map to Shopify's
 * [standard product categories](https://help.shopify.com/manual/products/details/product-type).
 * For example, you can use a custom product to manage gift cards, shipping requirements, localized product
 * information, or weight measurements and conversions.
 */
export interface CustomProduct {
  __typename?: 'CustomProduct';
  /** Whether the merchandise is a gift card. */
  isGiftCard: Scalars['Boolean']['output'];
  /**
   * Whether the item needs to be shipped to the customer. For example, a
   * digital gift card doesn't need to be shipped, but a t-shirt does
   * need to be shipped.
   */
  requiresShipping: Scalars['Boolean']['output'];
  /**
   * The localized name for the product that displays to customers. The title is used to construct the product's
   * handle, which is a unique, human-readable string of the product's title. For example, if a product is titled
   * "Black Sunglasses", then the handle is `black-sunglasses`.
   */
  title: Scalars['String']['output'];
  /** The product variant's weight, in the system of measurement set in the `weightUnit` field. */
  weight: Maybe<Scalars['Float']['output']>;
  /** The unit of measurement for weight. */
  weightUnit: WeightUnit;
}

/**
 * Represents a [customer](https://help.shopify.com/manual/customers/manage-customers)
 * who has an [account](https://help.shopify.com/manual/customers/customer-accounts) with the store.
 * `Customer` returns data including the customer's contact information and order history.
 */
export interface Customer extends HasMetafields {
  __typename?: 'Customer';
  /**
   * The total amount that the customer has spent on orders.
   * The amount is converted from the shop's currency to the currency of the cart using a market rate.
   */
  amountSpent: MoneyV2;
  /**
   * The full name of the customer, based on the values for `firstName` and `lastName`.
   * If `firstName` and `lastName` aren't specified, then the value is the customer's email address.
   * If the email address isn't specified, then the value is the customer's phone number.
   */
  displayName: Scalars['String']['output'];
  /** The customer's email address. */
  email: Maybe<Scalars['String']['output']>;
  /** The customer's first name. */
  firstName: Maybe<Scalars['String']['output']>;
  /**
   * Whether the customer is associated with any of the specified tags. The customer must have at least one tag
   * from the list to return `true`.
   */
  hasAnyTag: Scalars['Boolean']['output'];
  /**
   * Whether the customer is associated with the specified tags. The customer must have all of the tags in the list
   * to return `true`.
   */
  hasTags: Array<HasTagResponse>;
  /**
   * A [globally-unique ID](https://shopify.dev/docs/api/usage/gids)
   * for the customer.
   */
  id: Scalars['ID']['output'];
  /** The customer's last name. */
  lastName: Maybe<Scalars['String']['output']>;
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield: Maybe<Metafield>;
  /** The total number of orders that the customer has made at the store. */
  numberOfOrders: Scalars['Int']['output'];
}


/**
 * Represents a [customer](https://help.shopify.com/manual/customers/manage-customers)
 * who has an [account](https://help.shopify.com/manual/customers/customer-accounts) with the store.
 * `Customer` returns data including the customer's contact information and order history.
 */
export interface CustomerHasAnyTagArgs {
  tags?: Array<Scalars['String']['input']>;
}


/**
 * Represents a [customer](https://help.shopify.com/manual/customers/manage-customers)
 * who has an [account](https://help.shopify.com/manual/customers/customer-accounts) with the store.
 * `Customer` returns data including the customer's contact information and order history.
 */
export interface CustomerHasTagsArgs {
  tags?: Array<Scalars['String']['input']>;
}


/**
 * Represents a [customer](https://help.shopify.com/manual/customers/manage-customers)
 * who has an [account](https://help.shopify.com/manual/customers/customer-accounts) with the store.
 * `Customer` returns data including the customer's contact information and order history.
 */
export interface CustomerMetafieldArgs {
  key: Scalars['String']['input'];
  namespace: InputMaybe<Scalars['String']['input']>;
}

/** Represents information about the merchandise in the cart. */
export interface DeliverableCartLine {
  __typename?: 'DeliverableCartLine';
  /**
   * The custom attributes associated with a cart to store additional information. Cart attributes
   * allow you to collect specific information from customers on the **Cart** page, such as order notes,
   * gift wrapping requests, or custom product details. Attributes are stored as key-value pairs.
   *
   * Cart line attributes are equivalent to the
   * [`line_item`](https://shopify.dev/docs/apps/build/purchase-options/subscriptions/selling-plans)
   * object in Liquid.
   */
  attribute: Maybe<Attribute>;
  /** The ID of the cart line. */
  id: Scalars['ID']['output'];
  /** The item that the customer intends to purchase. */
  merchandise: Merchandise;
  /** The quantity of the item that the customer intends to purchase. */
  quantity: Scalars['Int']['output'];
}


/** Represents information about the merchandise in the cart. */
export interface DeliverableCartLineAttributeArgs {
  key: InputMaybe<Scalars['String']['input']>;
}

/** A customization representing how delivery options will be ordered, hidden, or renamed. */
export interface DeliveryCustomization extends HasMetafields {
  __typename?: 'DeliveryCustomization';
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield: Maybe<Metafield>;
}


/** A customization representing how delivery options will be ordered, hidden, or renamed. */
export interface DeliveryCustomizationMetafieldArgs {
  key: Scalars['String']['input'];
  namespace: InputMaybe<Scalars['String']['input']>;
}

/** List of different delivery method types. */
export type DeliveryMethod =
  /** Local Delivery. */
  | 'LOCAL'
  /** None. */
  | 'NONE'
  /** Shipping to a Pickup Point. */
  | 'PICKUP_POINT'
  /** Local Pickup. */
  | 'PICK_UP'
  /** Retail. */
  | 'RETAIL'
  /** Shipping. */
  | 'SHIPPING';

/**
 * The output of the Function run target.
 * The object contains the operations to apply to delivery options in checkout. In
 * API versions 2023-10 and beyond, this type is deprecated in favor of
 * `FunctionRunResult`.
 */
export interface FunctionResult {
  /**
   * The ordered list of operations to apply to the list of
   * [delivery options](https://shopify.dev/docs/apps/build/checkout/delivery-shipping/delivery-options/build-function).
   */
  operations: Array<Operation>;
}

/**
 * The output of the Function run target.
 * The object contains the operations to apply to delivery options in checkout.
 */
export interface FunctionRunResult {
  /**
   * The ordered list of operations to apply to the list of
   * [delivery options](https://shopify.dev/docs/apps/build/checkout/delivery-shipping/delivery-options/build-function).
   */
  operations: Array<Operation>;
}

/** Represents information about the metafields associated to the specified resource. */
export interface HasMetafields {
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield: Maybe<Metafield>;
}


/** Represents information about the metafields associated to the specified resource. */
export interface HasMetafieldsMetafieldArgs {
  key: Scalars['String']['input'];
  namespace: InputMaybe<Scalars['String']['input']>;
}

/** Whether a Shopify resource, such as a product or customer, has a specified tag. */
export interface HasTagResponse {
  __typename?: 'HasTagResponse';
  /** Whether the Shopify resource has the tag. */
  hasTag: Scalars['Boolean']['output'];
  /**
   * A searchable keyword that's associated with a Shopify resource, such as a product or customer. For example,
   * a merchant might apply the `sports` and `summer` tags to products that are associated with sportswear for
   * summer.
   */
  tag: Scalars['String']['output'];
}

/** An operation that hides a delivery option from a list that's offered to customers at checkout. */
export interface HideOperation {
  /** The handle of the delivery option to hide. */
  deliveryOptionHandle: Scalars['Handle']['input'];
}

export interface Input {
  __typename?: 'Input';
  /**
   * The cart where the Function is running. A cart contains the merchandise that a customer intends to purchase
   * and information about the customer, such as the customer's email address and phone number.
   */
  cart: Cart;
  /**
   * The backend logic that the Function is running to define how
   * [delivery options](https://shopify.dev/apps/build/checkout/delivery-shipping/delivery-options/build-function)
   * are sorted, hidden, or renamed. It includes the
   * [metafields](https://shopify.dev/docs/apps/build/custom-data)
   * that are associated with the customization.
   */
  deliveryCustomization: DeliveryCustomization;
  /**
   * The regional and language settings that determine how the Function
   * handles currency, numbers, dates, and other locale-specific values
   * during discount calculations. These settings are based on the store's configured
   * [localization practices](https://shopify.dev/docs/apps/build/functions/localization-practices-shopify-functions).
   */
  localization: Localization;
  /**
   * The exchange rate used to convert discounts between the shop's default
   * currency and the currency that displays to the customer during checkout.
   * For example, if a store operates in USD but a customer is viewing discounts in EUR,
   * then the presentment currency rate handles this conversion for accurate pricing.
   */
  presentmentCurrencyRate: Scalars['Decimal']['output'];
  /**
   * Information about the shop where the Function is running, including the shop's timezone
   * setting and associated [metafields](https://shopify.dev/docs/apps/build/custom-data).
   */
  shop: Shop;
}

/**
 * The language for which the store is customized, ensuring content is tailored to local customers.
 * This includes product descriptions and customer communications that resonate with the target audience.
 */
export interface Language {
  __typename?: 'Language';
  /** The ISO code. */
  isoCode: LanguageCode;
}

/** Language codes supported by Shopify. */
export type LanguageCode =
  /** Afrikaans. */
  | 'AF'
  /** Akan. */
  | 'AK'
  /** Amharic. */
  | 'AM'
  /** Arabic. */
  | 'AR'
  /** Assamese. */
  | 'AS'
  /** Azerbaijani. */
  | 'AZ'
  /** Belarusian. */
  | 'BE'
  /** Bulgarian. */
  | 'BG'
  /** Bambara. */
  | 'BM'
  /** Bangla. */
  | 'BN'
  /** Tibetan. */
  | 'BO'
  /** Breton. */
  | 'BR'
  /** Bosnian. */
  | 'BS'
  /** Catalan. */
  | 'CA'
  /** Chechen. */
  | 'CE'
  /** Central Kurdish. */
  | 'CKB'
  /** Czech. */
  | 'CS'
  /** Church Slavic. */
  | 'CU'
  /** Welsh. */
  | 'CY'
  /** Danish. */
  | 'DA'
  /** German. */
  | 'DE'
  /** Dzongkha. */
  | 'DZ'
  /** Ewe. */
  | 'EE'
  /** Greek. */
  | 'EL'
  /** English. */
  | 'EN'
  /** Esperanto. */
  | 'EO'
  /** Spanish. */
  | 'ES'
  /** Estonian. */
  | 'ET'
  /** Basque. */
  | 'EU'
  /** Persian. */
  | 'FA'
  /** Fulah. */
  | 'FF'
  /** Finnish. */
  | 'FI'
  /** Filipino. */
  | 'FIL'
  /** Faroese. */
  | 'FO'
  /** French. */
  | 'FR'
  /** Western Frisian. */
  | 'FY'
  /** Irish. */
  | 'GA'
  /** Scottish Gaelic. */
  | 'GD'
  /** Galician. */
  | 'GL'
  /** Gujarati. */
  | 'GU'
  /** Manx. */
  | 'GV'
  /** Hausa. */
  | 'HA'
  /** Hebrew. */
  | 'HE'
  /** Hindi. */
  | 'HI'
  /** Croatian. */
  | 'HR'
  /** Hungarian. */
  | 'HU'
  /** Armenian. */
  | 'HY'
  /** Interlingua. */
  | 'IA'
  /** Indonesian. */
  | 'ID'
  /** Igbo. */
  | 'IG'
  /** Sichuan Yi. */
  | 'II'
  /** Icelandic. */
  | 'IS'
  /** Italian. */
  | 'IT'
  /** Japanese. */
  | 'JA'
  /** Javanese. */
  | 'JV'
  /** Georgian. */
  | 'KA'
  /** Kikuyu. */
  | 'KI'
  /** Kazakh. */
  | 'KK'
  /** Kalaallisut. */
  | 'KL'
  /** Khmer. */
  | 'KM'
  /** Kannada. */
  | 'KN'
  /** Korean. */
  | 'KO'
  /** Kashmiri. */
  | 'KS'
  /** Kurdish. */
  | 'KU'
  /** Cornish. */
  | 'KW'
  /** Kyrgyz. */
  | 'KY'
  /** Luxembourgish. */
  | 'LB'
  /** Ganda. */
  | 'LG'
  /** Lingala. */
  | 'LN'
  /** Lao. */
  | 'LO'
  /** Lithuanian. */
  | 'LT'
  /** Luba-Katanga. */
  | 'LU'
  /** Latvian. */
  | 'LV'
  /** Malagasy. */
  | 'MG'
  /** Māori. */
  | 'MI'
  /** Macedonian. */
  | 'MK'
  /** Malayalam. */
  | 'ML'
  /** Mongolian. */
  | 'MN'
  /** Marathi. */
  | 'MR'
  /** Malay. */
  | 'MS'
  /** Maltese. */
  | 'MT'
  /** Burmese. */
  | 'MY'
  /** Norwegian (Bokmål). */
  | 'NB'
  /** North Ndebele. */
  | 'ND'
  /** Nepali. */
  | 'NE'
  /** Dutch. */
  | 'NL'
  /** Norwegian Nynorsk. */
  | 'NN'
  /** Norwegian. */
  | 'NO'
  /** Oromo. */
  | 'OM'
  /** Odia. */
  | 'OR'
  /** Ossetic. */
  | 'OS'
  /** Punjabi. */
  | 'PA'
  /** Polish. */
  | 'PL'
  /** Pashto. */
  | 'PS'
  /** Portuguese. */
  | 'PT'
  /** Portuguese (Brazil). */
  | 'PT_BR'
  /** Portuguese (Portugal). */
  | 'PT_PT'
  /** Quechua. */
  | 'QU'
  /** Romansh. */
  | 'RM'
  /** Rundi. */
  | 'RN'
  /** Romanian. */
  | 'RO'
  /** Russian. */
  | 'RU'
  /** Kinyarwanda. */
  | 'RW'
  /** Sanskrit. */
  | 'SA'
  /** Sardinian. */
  | 'SC'
  /** Sindhi. */
  | 'SD'
  /** Northern Sami. */
  | 'SE'
  /** Sango. */
  | 'SG'
  /** Sinhala. */
  | 'SI'
  /** Slovak. */
  | 'SK'
  /** Slovenian. */
  | 'SL'
  /** Shona. */
  | 'SN'
  /** Somali. */
  | 'SO'
  /** Albanian. */
  | 'SQ'
  /** Serbian. */
  | 'SR'
  /** Sundanese. */
  | 'SU'
  /** Swedish. */
  | 'SV'
  /** Swahili. */
  | 'SW'
  /** Tamil. */
  | 'TA'
  /** Telugu. */
  | 'TE'
  /** Tajik. */
  | 'TG'
  /** Thai. */
  | 'TH'
  /** Tigrinya. */
  | 'TI'
  /** Turkmen. */
  | 'TK'
  /** Tongan. */
  | 'TO'
  /** Turkish. */
  | 'TR'
  /** Tatar. */
  | 'TT'
  /** Uyghur. */
  | 'UG'
  /** Ukrainian. */
  | 'UK'
  /** Urdu. */
  | 'UR'
  /** Uzbek. */
  | 'UZ'
  /** Vietnamese. */
  | 'VI'
  /** Volapük. */
  | 'VO'
  /** Wolof. */
  | 'WO'
  /** Xhosa. */
  | 'XH'
  /** Yiddish. */
  | 'YI'
  /** Yoruba. */
  | 'YO'
  /** Chinese. */
  | 'ZH'
  /** Chinese (Simplified). */
  | 'ZH_CN'
  /** Chinese (Traditional). */
  | 'ZH_TW'
  /** Zulu. */
  | 'ZU';

/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export interface LocalTime {
  __typename?: 'LocalTime';
  /** The current date relative to the parent object. */
  date: Scalars['Date']['output'];
  /** Returns true if the current date and time is at or past the given date and time, and false otherwise. */
  dateTimeAfter: Scalars['Boolean']['output'];
  /** Returns true if the current date and time is before the given date and time, and false otherwise. */
  dateTimeBefore: Scalars['Boolean']['output'];
  /** Returns true if the current date and time is between the two given date and times, and false otherwise. */
  dateTimeBetween: Scalars['Boolean']['output'];
  /** Returns true if the current time is at or past the given time, and false otherwise. */
  timeAfter: Scalars['Boolean']['output'];
  /** Returns true if the current time is at or past the given time, and false otherwise. */
  timeBefore: Scalars['Boolean']['output'];
  /** Returns true if the current time is between the two given times, and false otherwise. */
  timeBetween: Scalars['Boolean']['output'];
}


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export interface LocalTimeDateTimeAfterArgs {
  dateTime: Scalars['DateTimeWithoutTimezone']['input'];
}


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export interface LocalTimeDateTimeBeforeArgs {
  dateTime: Scalars['DateTimeWithoutTimezone']['input'];
}


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export interface LocalTimeDateTimeBetweenArgs {
  endDateTime: Scalars['DateTimeWithoutTimezone']['input'];
  startDateTime: Scalars['DateTimeWithoutTimezone']['input'];
}


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export interface LocalTimeTimeAfterArgs {
  time: Scalars['TimeWithoutTimezone']['input'];
}


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export interface LocalTimeTimeBeforeArgs {
  time: Scalars['TimeWithoutTimezone']['input'];
}


/**
 * The current time based on the
 * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
 */
export interface LocalTimeTimeBetweenArgs {
  endTime: Scalars['TimeWithoutTimezone']['input'];
  startTime: Scalars['TimeWithoutTimezone']['input'];
}

/**
 * Details about the localized experience for the store in a specific region, including country and language
 * settings. The localized experience is determined by the store's settings and the customer's location.
 * Localization ensures that customers can access relevant content and options while browsing or purchasing
 * products in a store.
 */
export interface Localization {
  __typename?: 'Localization';
  /**
   * The country for which the store is customized, reflecting local preferences and regulations.
   * Localization might influence the language, currency, and product offerings available in a store to enhance
   * the shopping experience for customers in that region.
   */
  country: Country;
  /**
   * The language for which the store is customized, ensuring content is tailored to local customers.
   * This includes product descriptions and customer communications that resonate with the target audience.
   */
  language: Language;
  /** The market of the active localized experience. */
  market: Market;
}

/**
 * Represents the value captured by a localized field. Localized fields are
 * additional fields required by certain countries on international orders. For
 * example, some countries require additional fields for customs information or tax
 * identification numbers.
 */
export interface LocalizedField {
  __typename?: 'LocalizedField';
  /** The key of the localized field. */
  key: LocalizedFieldKey;
  /** The title of the localized field. */
  title: Scalars['String']['output'];
  /** The value of the localized field. */
  value: Maybe<Scalars['String']['output']>;
}

/** Unique key identifying localized fields. */
export type LocalizedFieldKey =
  /** Localized field key 'shipping_credential_br' for country Brazil. */
  | 'SHIPPING_CREDENTIAL_BR'
  /** Localized field key 'shipping_credential_cl' for country Chile. */
  | 'SHIPPING_CREDENTIAL_CL'
  /** Localized field key 'shipping_credential_cn' for country China. */
  | 'SHIPPING_CREDENTIAL_CN'
  /** Localized field key 'shipping_credential_co' for country Colombia. */
  | 'SHIPPING_CREDENTIAL_CO'
  /** Localized field key 'shipping_credential_cr' for country Costa Rica. */
  | 'SHIPPING_CREDENTIAL_CR'
  /** Localized field key 'shipping_credential_ec' for country Ecuador. */
  | 'SHIPPING_CREDENTIAL_EC'
  /** Localized field key 'shipping_credential_es' for country Spain. */
  | 'SHIPPING_CREDENTIAL_ES'
  /** Localized field key 'shipping_credential_gt' for country Guatemala. */
  | 'SHIPPING_CREDENTIAL_GT'
  /** Localized field key 'shipping_credential_id' for country Indonesia. */
  | 'SHIPPING_CREDENTIAL_ID'
  /** Localized field key 'shipping_credential_kr' for country South Korea. */
  | 'SHIPPING_CREDENTIAL_KR'
  /** Localized field key 'shipping_credential_mx' for country Mexico. */
  | 'SHIPPING_CREDENTIAL_MX'
  /** Localized field key 'shipping_credential_my' for country Malaysia. */
  | 'SHIPPING_CREDENTIAL_MY'
  /** Localized field key 'shipping_credential_pe' for country Peru. */
  | 'SHIPPING_CREDENTIAL_PE'
  /** Localized field key 'shipping_credential_pt' for country Portugal. */
  | 'SHIPPING_CREDENTIAL_PT'
  /** Localized field key 'shipping_credential_py' for country Paraguay. */
  | 'SHIPPING_CREDENTIAL_PY'
  /** Localized field key 'shipping_credential_tr' for country Turkey. */
  | 'SHIPPING_CREDENTIAL_TR'
  /** Localized field key 'shipping_credential_tw' for country Taiwan. */
  | 'SHIPPING_CREDENTIAL_TW'
  /** Localized field key 'shipping_credential_type_co' for country Colombia. */
  | 'SHIPPING_CREDENTIAL_TYPE_CO'
  /** Localized field key 'tax_credential_br' for country Brazil. */
  | 'TAX_CREDENTIAL_BR'
  /** Localized field key 'tax_credential_cl' for country Chile. */
  | 'TAX_CREDENTIAL_CL'
  /** Localized field key 'tax_credential_co' for country Colombia. */
  | 'TAX_CREDENTIAL_CO'
  /** Localized field key 'tax_credential_cr' for country Costa Rica. */
  | 'TAX_CREDENTIAL_CR'
  /** Localized field key 'tax_credential_ec' for country Ecuador. */
  | 'TAX_CREDENTIAL_EC'
  /** Localized field key 'tax_credential_es' for country Spain. */
  | 'TAX_CREDENTIAL_ES'
  /** Localized field key 'tax_credential_gt' for country Guatemala. */
  | 'TAX_CREDENTIAL_GT'
  /** Localized field key 'tax_credential_id' for country Indonesia. */
  | 'TAX_CREDENTIAL_ID'
  /** Localized field key 'tax_credential_it' for country Italy. */
  | 'TAX_CREDENTIAL_IT'
  /** Localized field key 'tax_credential_mx' for country Mexico. */
  | 'TAX_CREDENTIAL_MX'
  /** Localized field key 'tax_credential_my' for country Malaysia. */
  | 'TAX_CREDENTIAL_MY'
  /** Localized field key 'tax_credential_pe' for country Peru. */
  | 'TAX_CREDENTIAL_PE'
  /** Localized field key 'tax_credential_pt' for country Portugal. */
  | 'TAX_CREDENTIAL_PT'
  /** Localized field key 'tax_credential_py' for country Paraguay. */
  | 'TAX_CREDENTIAL_PY'
  /** Localized field key 'tax_credential_tr' for country Turkey. */
  | 'TAX_CREDENTIAL_TR'
  /** Localized field key 'tax_credential_type_co' for country Colombia. */
  | 'TAX_CREDENTIAL_TYPE_CO'
  /** Localized field key 'tax_credential_type_mx' for country Mexico. */
  | 'TAX_CREDENTIAL_TYPE_MX'
  /** Localized field key 'tax_credential_use_mx' for country Mexico. */
  | 'TAX_CREDENTIAL_USE_MX'
  /** Localized field key 'tax_email_it' for country Italy. */
  | 'TAX_EMAIL_IT';

/** Represents a mailing address. */
export interface MailingAddress {
  __typename?: 'MailingAddress';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1: Maybe<Scalars['String']['output']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2: Maybe<Scalars['String']['output']>;
  /** The name of the city, district, village, or town. */
  city: Maybe<Scalars['String']['output']>;
  /** The name of the customer's company or organization. */
  company: Maybe<Scalars['String']['output']>;
  /** The two-letter code for the country of the address. For example, US. */
  countryCode: Maybe<CountryCode>;
  /** The first name of the customer. */
  firstName: Maybe<Scalars['String']['output']>;
  /** The last name of the customer. */
  lastName: Maybe<Scalars['String']['output']>;
  /** The approximate latitude of the address. */
  latitude: Maybe<Scalars['Float']['output']>;
  /** The approximate longitude of the address. */
  longitude: Maybe<Scalars['Float']['output']>;
  /** The market of the address. */
  market: Maybe<Market>;
  /** The full name of the customer, based on firstName and lastName. */
  name: Maybe<Scalars['String']['output']>;
  /** A unique phone number for the customer. Formatted using E.164 standard. For example, +16135551111. */
  phone: Maybe<Scalars['String']['output']>;
  /** The alphanumeric code for the region. For example, ON. */
  provinceCode: Maybe<Scalars['String']['output']>;
  /** The zip or postal code of the address. */
  zip: Maybe<Scalars['String']['output']>;
}

/**
 * A market is a group of one or more regions that you want to target for international sales.
 * By creating a market, you can configure a distinct, localized shopping experience for
 * customers from a specific area of the world. For example, you can
 * [change currency](https://shopify.dev/api/admin-graphql/current/mutations/marketCurrencySettingsUpdate),
 * [configure international pricing](https://shopify.dev/api/examples/product-price-lists),
 * or [add market-specific domains or subfolders](https://shopify.dev/api/admin-graphql/current/objects/MarketWebPresence).
 */
export interface Market extends HasMetafields {
  __typename?: 'Market';
  /** A human-readable unique string for the market automatically generated from its title. */
  handle: Scalars['Handle']['output'];
  /** A globally-unique identifier. */
  id: Scalars['ID']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield: Maybe<Metafield>;
  /** A geographic region which comprises a market. */
  regions: Array<MarketRegion>;
}


/**
 * A market is a group of one or more regions that you want to target for international sales.
 * By creating a market, you can configure a distinct, localized shopping experience for
 * customers from a specific area of the world. For example, you can
 * [change currency](https://shopify.dev/api/admin-graphql/current/mutations/marketCurrencySettingsUpdate),
 * [configure international pricing](https://shopify.dev/api/examples/product-price-lists),
 * or [add market-specific domains or subfolders](https://shopify.dev/api/admin-graphql/current/objects/MarketWebPresence).
 */
export interface MarketMetafieldArgs {
  key: Scalars['String']['input'];
  namespace: InputMaybe<Scalars['String']['input']>;
}

/** Represents a region. */
export interface MarketRegion {
  /** The name of the region in the language of the current localization. */
  name: Maybe<Scalars['String']['output']>;
}

/** A country which comprises a market. */
export interface MarketRegionCountry extends MarketRegion {
  __typename?: 'MarketRegionCountry';
  /** The two-letter code for the country. */
  code: CountryCode;
  /** The country name in the language of the current localization. */
  name: Scalars['String']['output'];
}

/**
 * The item that a customer intends to purchase. Merchandise can be a product variant or a custom
 * product.
 *
 * A product variant is a specific version of a product that comes in more than one option, such as size or color.
 * For example, if a merchant sells t-shirts with options for size and color, then a small, blue t-shirt would be
 * one product variant and a large, blue t-shirt would be another.
 *
 * A custom product represents a product that doesn't map to Shopify's
 * [standard product categories](https://help.shopify.com/manual/products/details/product-type).
 * For example, you can use a custom product to manage gift cards, shipping requirements, localized product
 * information, or weight measurements and conversions.
 */
export type Merchandise = CustomProduct | ProductVariant;

/**
 * [Custom fields](https://shopify.dev/docs/apps/build/custom-data) that store additional information
 * about a Shopify resource, such as products, orders, and
 * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
 * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
 * enables you to customize the checkout experience.
 */
export interface Metafield {
  __typename?: 'Metafield';
  /** The data that's stored in the metafield, using JSON format. */
  jsonValue: Scalars['JSON']['output'];
  /**
   * The [type of data](https://shopify.dev/apps/metafields/types) that the metafield stores in
   * the `value` field.
   */
  type: Scalars['String']['output'];
  /**
   * The data that's stored in the metafield. The data is always stored as a string,
   * regardless of the [metafield's type](https://shopify.dev/apps/metafields/types).
   */
  value: Scalars['String']['output'];
}

/** A precise monetary value and its associated currency. For example, 12.99 USD. */
export interface MoneyV2 {
  __typename?: 'MoneyV2';
  /**
   * A monetary value in decimal format, allowing for precise representation of cents or fractional
   * currency. For example, 12.99.
   */
  amount: Scalars['Decimal']['output'];
  /**
   * The three-letter currency code that represents a world currency used in a store. Currency codes
   * include standard [standard ISO 4217 codes](https://en.wikipedia.org/wiki/ISO_4217), legacy codes,
   * and non-standard codes. For example, USD.
   */
  currencyCode: CurrencyCode;
}

/**
 * An operation that sorts a list of delivery options that are offered to customers at checkout.
 *
 * If you reorder shipping delivery options, then you are
 * [prohibited](https://shopify.dev/docs/apps/launch/app-requirements-checklist#prohibited-app-types).
 * from automatically selecting higher-priced delivery alternatives by default. The cheapest shipping delivery option
 * must always be the first option selected.
 */
export interface MoveOperation {
  /** The handle of the delivery option to move. */
  deliveryOptionHandle: Scalars['Handle']['input'];
  /** The target index within the delivery group to move the delivery option to. */
  index: Scalars['Int']['input'];
}

/** The root mutation for the API. */
export interface MutationRoot {
  __typename?: 'MutationRoot';
  /**
   * Handles the Function result.
   * @deprecated Use the target-specific field instead.
   */
  handleResult: Scalars['Void']['output'];
  /** Handles the Function result for the purchase.delivery-customization.run target. */
  run: Scalars['Void']['output'];
}


/** The root mutation for the API. */
export interface MutationRootHandleResultArgs {
  result: FunctionResult;
}


/** The root mutation for the API. */
export interface MutationRootRunArgs {
  result: FunctionRunResult;
}

/** An operation to apply to the list of delivery options. */
export type Operation =
  /** An operation that hides a delivery option from a list that's offered to customers at checkout. */
  { hide: HideOperation; move?: never; rename?: never; }
  |  /**
   * An operation that sorts a list of delivery options that are offered to customers at checkout.
   *
   * If you reorder shipping delivery options, then you are
   * [prohibited](https://shopify.dev/docs/apps/launch/app-requirements-checklist#prohibited-app-types).
   * from automatically selecting higher-priced delivery alternatives by default. The cheapest shipping delivery option
   * must always be the first option selected.
   */
  { hide?: never; move: MoveOperation; rename?: never; }
  |  /**
   * An operation that renames a delivery option that's offered to customers at checkout.
   *
   * The carrier name is automatically prepended to the delivery option title at checkout when using the
   * `RenameOperation` object, and can't be altered or omitted through the API. For example, if the carrier name
   * is **UPS** and the option is **Standard**, then you could change **UPS Standard** to **UPS Standard Shipping**,
   * but you couldn't change **UPS Standard** to **Standard Shipping**.
   */
  { hide?: never; move?: never; rename: RenameOperation; };

/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export interface Product extends HasMetafields {
  __typename?: 'Product';
  /**
   * A unique, human-readable string of the product's title. A handle can contain letters, hyphens (`-`), and
   * numbers, but not spaces. The handle is used in the online store URL for the product. For example, if a product
   * is titled "Black Sunglasses", then the handle is `black-sunglasses`.
   */
  handle: Scalars['Handle']['output'];
  /**
   * Whether the product is associated with any of the specified tags. The product must have at least one tag
   * from the list to return `true`.
   */
  hasAnyTag: Scalars['Boolean']['output'];
  /**
   * Whether the product is associated with the specified tags. The product must have all of the tags in the list
   * to return `true`.
   */
  hasTags: Array<HasTagResponse>;
  /**
   * A [globally-unique ID](https://shopify.dev/docs/api/usage/gids)
   * for the product.
   */
  id: Scalars['ID']['output'];
  /**
   * Whether the product is in any of the specified collections. The product must be in at least one collection
   * from the list to return `true`.
   *
   * A collection is a group of products that can be displayed in online stores and other sales channels in
   * categories, which makes it easy for customers to find them. For example, an athletics store might create
   * different collections for running attire and accessories.
   */
  inAnyCollection: Scalars['Boolean']['output'];
  /**
   * Whether the product is in the specified collections. The product must be in all of the collections in the
   * list to return `true`.
   *
   * A collection is a group of products that can be displayed in online stores and other sales channels in
   * categories, which makes it easy for customers to find them. For example, an athletics store might create
   * different collections for running attire and accessories.
   */
  inCollections: Array<CollectionMembership>;
  /** Whether the product is a gift card. */
  isGiftCard: Scalars['Boolean']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield: Maybe<Metafield>;
  /**
   * A custom category for a product. Product types allow merchants to define categories other than the
   * ones available in Shopify's
   * [standard product categories](https://help.shopify.com/manual/products/details/product-type).
   */
  productType: Maybe<Scalars['String']['output']>;
  /**
   * The localized name for the product that displays to customers. The title is used to construct the product's
   * handle, which is a unique, human-readable string of the product's title. For example, if a product is titled
   * "Black Sunglasses", then the handle is `black-sunglasses`.
   */
  title: Scalars['String']['output'];
  /** The name of the product's vendor. */
  vendor: Maybe<Scalars['String']['output']>;
}


/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export interface ProductHasAnyTagArgs {
  tags?: Array<Scalars['String']['input']>;
}


/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export interface ProductHasTagsArgs {
  tags?: Array<Scalars['String']['input']>;
}


/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export interface ProductInAnyCollectionArgs {
  ids?: Array<Scalars['ID']['input']>;
}


/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export interface ProductInCollectionsArgs {
  ids?: Array<Scalars['ID']['input']>;
}


/**
 * The goods and services that merchants offer to customers. Products can include details such as
 * title, vendor, and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 * Products can be organized by grouping them into a collection.
 *
 * Learn more about [managing products in a merchant's store](https://help.shopify.com/manual/products).
 */
export interface ProductMetafieldArgs {
  key: Scalars['String']['input'];
  namespace: InputMaybe<Scalars['String']['input']>;
}

/**
 * A specific version of a product that comes in more than one option, such as size or color. For example,
 * if a merchant sells t-shirts with options for size and color, then a small, blue t-shirt would be one
 * product variant and a large, blue t-shirt would be another.
 */
export interface ProductVariant extends HasMetafields {
  __typename?: 'ProductVariant';
  /**
   * A [globally-unique ID](https://shopify.dev/docs/api/usage/gids)
   * for the product variant.
   */
  id: Scalars['ID']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield: Maybe<Metafield>;
  /**
   * The product associated with the product variant. For example, if a
   * merchant sells t-shirts with options for size and color, then a small,
   * blue t-shirt would be one product variant and a large, blue t-shirt would be another.
   * The product associated with the product variant would be the t-shirt itself.
   */
  product: Product;
  /**
   * Whether the item needs to be shipped to the customer. For example, a
   * digital gift card doesn't need to be shipped, but a t-shirt does
   * need to be shipped.
   */
  requiresShipping: Scalars['Boolean']['output'];
  /**
   * A case-sensitive identifier for the product variant in the merchant's store. For example, `"BBC-1"`.
   * A product variant must have a SKU to be connected to a
   * [fulfillment service](https://shopify.dev/docs/apps/build/orders-fulfillment/fulfillment-service-apps/build-for-fulfillment-services).
   */
  sku: Maybe<Scalars['String']['output']>;
  /** The localized name for the product variant that displays to customers. */
  title: Maybe<Scalars['String']['output']>;
  /** The product variant's weight, in the system of measurement set in the `weightUnit` field. */
  weight: Maybe<Scalars['Float']['output']>;
  /** The unit of measurement for weight. */
  weightUnit: WeightUnit;
}


/**
 * A specific version of a product that comes in more than one option, such as size or color. For example,
 * if a merchant sells t-shirts with options for size and color, then a small, blue t-shirt would be one
 * product variant and a large, blue t-shirt would be another.
 */
export interface ProductVariantMetafieldArgs {
  key: Scalars['String']['input'];
  namespace: InputMaybe<Scalars['String']['input']>;
}

/**
 * The company of a B2B customer that's interacting with the cart.
 * Used to manage and track purchases made by businesses rather than individual customers.
 */
export interface PurchasingCompany {
  __typename?: 'PurchasingCompany';
  /** The company associated to the order or draft order. */
  company: Company;
  /** The company contact associated to the order or draft order. */
  contact: Maybe<CompanyContact>;
  /** The company location associated to the order or draft order. */
  location: CompanyLocation;
}

/**
 * An operation that renames a delivery option that's offered to customers at checkout.
 *
 * The carrier name is automatically prepended to the delivery option title at checkout when using the
 * `RenameOperation` object, and can't be altered or omitted through the API. For example, if the carrier name
 * is **UPS** and the option is **Standard**, then you could change **UPS Standard** to **UPS Standard Shipping**,
 * but you couldn't change **UPS Standard** to **Standard Shipping**.
 */
export interface RenameOperation {
  /** The handle of the delivery option to rename. */
  deliveryOptionHandle: Scalars['Handle']['input'];
  /** The new name for the delivery option. */
  title: Scalars['String']['input'];
}

/** Represents how products and variants can be sold and purchased. */
export interface SellingPlan extends HasMetafields {
  __typename?: 'SellingPlan';
  /** The description of the selling plan. */
  description: Maybe<Scalars['String']['output']>;
  /** A globally-unique identifier. */
  id: Scalars['ID']['output'];
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield: Maybe<Metafield>;
  /** The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'. */
  name: Scalars['String']['output'];
  /** Whether purchasing the selling plan will result in multiple deliveries. */
  recurringDeliveries: Scalars['Boolean']['output'];
}


/** Represents how products and variants can be sold and purchased. */
export interface SellingPlanMetafieldArgs {
  key: Scalars['String']['input'];
  namespace: InputMaybe<Scalars['String']['input']>;
}

/**
 * Represents an association between a variant and a selling plan. Selling plan
 * allocations describe the options offered for each variant, and the price of the
 * variant when purchased with a selling plan.
 */
export interface SellingPlanAllocation {
  __typename?: 'SellingPlanAllocation';
  /**
   * A list of price adjustments, with a maximum of two. When there are two, the
   * first price adjustment goes into effect at the time of purchase, while the
   * second one starts after a certain number of orders. A price adjustment
   * represents how a selling plan affects pricing when a variant is purchased with
   * a selling plan. Prices display in the customer's currency if the shop is
   * configured for it.
   */
  priceAdjustments: Array<SellingPlanAllocationPriceAdjustment>;
  /**
   * A representation of how products and variants can be sold and purchased. For
   * example, an individual selling plan could be '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  sellingPlan: SellingPlan;
}

/** The resulting prices for variants when they're purchased with a specific selling plan. */
export interface SellingPlanAllocationPriceAdjustment {
  __typename?: 'SellingPlanAllocationPriceAdjustment';
  /**
   * The effective price for a single delivery. For example, for a prepaid
   * subscription plan that includes 6 deliveries at the price of $48.00, the per
   * delivery price is $8.00.
   */
  perDeliveryPrice: MoneyV2;
  /**
   * The price of the variant when it's purchased with a selling plan For example,
   * for a prepaid subscription plan that includes 6 deliveries of $10.00 granola,
   * where the customer gets 20% off, the price is 6 x $10.00 x 0.80 = $48.00.
   */
  price: MoneyV2;
}

/**
 * Information about the store, including the store's timezone setting
 * and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 */
export interface Shop extends HasMetafields {
  __typename?: 'Shop';
  /**
   * The current time based on the
   * [store's timezone setting](https://help.shopify.com/manual/intro-to-shopify/initial-setup/setup-business-settings).
   */
  localTime: LocalTime;
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data) that stores additional information
   * about a Shopify resource, such as products, orders, and
   * [many more](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldOwnerType).
   * Using [metafields with Shopify Functions](https://shopify.dev/docs/apps/build/functions/input-output/metafields-for-input-queries)
   * enables you to customize the checkout experience.
   */
  metafield: Maybe<Metafield>;
}


/**
 * Information about the store, including the store's timezone setting
 * and custom data stored in [metafields](https://shopify.dev/docs/apps/build/custom-data).
 */
export interface ShopMetafieldArgs {
  key: Scalars['String']['input'];
  namespace: InputMaybe<Scalars['String']['input']>;
}

/** Units of measurement for weight. */
export type WeightUnit =
  /** Metric system unit of mass. */
  | 'GRAMS'
  /** 1 kilogram equals 1000 grams. */
  | 'KILOGRAMS'
  /** Imperial system unit of mass. */
  | 'OUNCES'
  /** 1 pound equals 16 ounces. */
  | 'POUNDS';

export type RunInputQueryVariables = Exact<{ [key: string]: never; }>;


export type RunInputQuery = { __typename?: 'Input', cart: { __typename?: 'Cart', buyerIdentity: { __typename?: 'BuyerIdentity', customer: { __typename?: 'Customer', hasAnyTag: boolean } | null } | null, deliveryGroups: Array<{ __typename?: 'CartDeliveryGroup', deliveryOptions: Array<{ __typename?: 'CartDeliveryOption', handle: any, title: string | null, deliveryMethodType: DeliveryMethod }> }> } };
