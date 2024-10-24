import { Card, CardBody, CardHeader, Flex, Heading, Highlight } from '@chakra-ui/react';

export default function Page() {
  return (
    <Flex
      width="100vw"
      height="100vh"
      align="center"
      justify="center"
      background="linear-gradient(150deg, #004922 0%, #02632f 40%, #058841 70%)"
    >
      <Card
        flex="true"
        flexDirection="column"
        justify="center"
        align="center"
        variant="outline"
        padding="20px"
        colorScheme="green"
      >
        <CardHeader>
          <Heading>지원되지 않는 브라우저입니다.</Heading>
        </CardHeader>
        <CardBody textAlign="center" fontSize="xl">
          <Highlight query="Chrome 브라우저" styles={{ fontWeight: 'bold' }}>
            최적의 사용자 경험을 위해 Chrome 브라우저를 이용해 주세요.
          </Highlight>
        </CardBody>
      </Card>
    </Flex>
  );
}
