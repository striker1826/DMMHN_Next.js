import { Card, CardBody, CardHeader, Flex, Heading, Highlight } from '@chakra-ui/react';

const mobilePage = () => {
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
          <Heading>모바일 웹에서는 일부 기능이 지원되지 않습니다.</Heading>
        </CardHeader>
        <CardBody textAlign="center" fontSize="xl">
          <Highlight query="데스크탑 또는 노트북" styles={{ fontWeight: 'bold' }}>
            최적의 사용자 경험을 위해 데스크탑 또는 노트북을 이용해 주세요.
          </Highlight>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default mobilePage;
