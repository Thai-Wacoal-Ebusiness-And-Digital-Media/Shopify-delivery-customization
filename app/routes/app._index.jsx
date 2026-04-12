import { Page, Layout, Card, Text, Badge } from "@shopify/polaris";

// Protected app index — only reachable after Shopify OAuth
export default function AppIndex() {
  return (
    <Page title="Delivery Customization">
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="h2" variant="headingMd">
              Hide Pickup for Client Users{" "}
              <Badge tone="success">Active</Badge>
            </Text>
            <Text as="p" variant="bodyMd">
              Customers tagged <strong>Client_NoPickup</strong> will not see
              local pickup options at checkout.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
