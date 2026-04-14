import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, Badge, Banner } from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  // Find our delivery customization function
  const functionsResponse = await admin.graphql(`
    {
      shopifyFunctions(first: 25) {
        edges {
          node {
            id
            title
            apiType
          }
        }
      }
    }
  `);
  const functionsData = await functionsResponse.json();
  const fn = functionsData.data?.shopifyFunctions?.edges?.find(
    (e) => e.node.apiType === "delivery_customization"
  )?.node;

  if (!fn) {
    return json({ status: "no_function", functionId: null, customizationId: null });
  }

  // Check if a delivery customization already exists for our function
  const existingResponse = await admin.graphql(`
    {
      deliveryCustomizations(first: 25) {
        edges {
          node {
            id
            title
            enabled
            functionId
          }
        }
      }
    }
  `);
  const existingData = await existingResponse.json();
  const existing = existingData.data?.deliveryCustomizations?.edges?.find(
    (e) => e.node.functionId === fn.id
  )?.node;

  if (existing) {
    return json({
      status: existing.enabled ? "active" : "inactive",
      functionId: fn.id,
      customizationId: existing.id,
    });
  }

  // None exists — create it now
  const createResponse = await admin.graphql(`
    mutation {
      deliveryCustomizationCreate(deliveryCustomization: {
        functionId: "${fn.id}",
        title: "Hide pickup for client users",
        enabled: true
      }) {
        deliveryCustomization { id title enabled }
        userErrors { field message }
      }
    }
  `);
  const createData = await createResponse.json();
  const errors = createData.data?.deliveryCustomizationCreate?.userErrors ?? [];
  if (errors.length > 0) {
    return json({ status: "error", error: errors.map((e) => e.message).join(", "), functionId: fn.id });
  }

  const created = createData.data?.deliveryCustomizationCreate?.deliveryCustomization;
  return json({ status: "active", functionId: fn.id, customizationId: created?.id });
}

export default function AppIndex() {
  const { status, functionId, error } = useLoaderData();

  return (
    <Page title="Delivery Customization">
      <Layout>
        <Layout.Section>
          {status === "error" && (
            <Banner tone="critical" title="Activation failed">
              <Text as="p">{error}</Text>
            </Banner>
          )}
          {status === "no_function" && (
            <Banner tone="warning" title="Function not found">
              <Text as="p">No delivery customization function found for this app. Run <code>shopify app deploy</code> and reload.</Text>
            </Banner>
          )}
          <Card>
            <Text as="h2" variant="headingMd">
              Hide Pickup for Client Users{" "}
              {status === "active" && <Badge tone="success">Active</Badge>}
              {status === "inactive" && <Badge tone="attention">Inactive</Badge>}
              {status === "error" && <Badge tone="critical">Error</Badge>}
              {status === "no_function" && <Badge>Not deployed</Badge>}
            </Text>
            <Text as="p" variant="bodyMd">
              Customers tagged <strong>Client_NoPickup</strong> will not see
              local pickup options at checkout.
            </Text>
            {functionId && (
              <Text as="p" variant="bodySm" tone="subdued">
                Function ID: {functionId}
              </Text>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
