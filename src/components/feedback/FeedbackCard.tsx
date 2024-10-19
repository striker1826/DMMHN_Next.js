import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

interface Props {
  heading: string;
  body?: string;
}

export default function FeedbackCard({ heading, body }: Props) {
  return (
    <Card width="330px" height="440px">
      <CardHeader>
        <Heading size="lg">{heading}</Heading>
      </CardHeader>
      <CardBody>
        <Text fontSize="lg" fontWeight="500">
          {body}
        </Text>
      </CardBody>
    </Card>
  );
}
