import { BadgeDelta, Card, Flex, Metric, Text, Title } from '@tremor/react';

export const ExampleIncomeDashboardWidget = () => {
  return (
    <Card className="flex flex-col gap-4">
      <Title>Income Widget</Title>
      <Flex>
        <div>
          <Text>Net Income</Text>
          <Metric>$16,842</Metric>
        </div>
        <BadgeDelta deltaType="increase">17.5%</BadgeDelta>
      </Flex>
      <Flex>
        <div>
          <Text>Gross Income</Text>
          <Metric>$20,000</Metric>
        </div>
        <BadgeDelta deltaType="increase">20%</BadgeDelta>
      </Flex>
    </Card>
  );
};
