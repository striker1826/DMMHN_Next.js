import { Card, CardBody, CardHeader, Divider, Heading, Text } from '@chakra-ui/react';

interface Props {
  heading: string;
  body?: string;
}

export default function FeedbackCard({ heading, body }: Props) {
  return (
    <Card width="360px" height="480px" boxShadow="md" borderRadius="xl" overflow="hidden">
      <CardHeader padding="0 5px 5px">
        <Heading
          bgColor="green.600"
          color="green.50"
          width="100%"
          padding="15px"
          borderRadius="xl"
          size="lg"
        >
          {heading}
        </Heading>
      </CardHeader>
      <CardBody padding="0 5px 5px" overflowY="auto">
        <Text
          height="100%"
          width="100%"
          bgColor="green.100"
          padding="15px"
          borderRadius="xl"
          fontSize="xl"
          fontWeight="600"
          color="green.900"
          lineHeight="1.8"
        >
          {body}
        </Text>
      </CardBody>
    </Card>
  );
}
