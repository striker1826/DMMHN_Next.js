import { Card, CardBody, CardHeader, Divider, Heading, Text } from '@chakra-ui/react';

interface Props {
  heading: string;
  body?: string;
}

export default function FeedbackCard({ heading, body }: Props) {
  return (
    <Card width="360px" height="480px" boxShadow="0 1px 3px 0 rgba(1,1,1,0.3)">
      <CardHeader>
        <Heading size="lg">{heading}</Heading>
      </CardHeader>
      <Divider borderColor="green" borderWidth="2px" w="95%" alignSelf="center" />
      <CardBody>
        <Text fontSize="lg" fontWeight="500">
          {body}
        </Text>
      </CardBody>
    </Card>
  );
}
