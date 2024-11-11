import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { RiErrorWarningFill } from 'react-icons/ri';

export default function ReadyInfoCard() {
  return (
    <Card
      variant="outline"
      border="1px"
      borderColor="blackAlpha.300"
      borderRadius="md"
      width="100%"
      height="100%"
    >
      <CardHeader borderBottom="1px" borderColor="blackAlpha.300" padding="20px">
        <Flex alignItems="center" gap="5px">
          <RiErrorWarningFill fontSize="24px" />
          <Heading fontSize="28px">중요합니다!</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <UnorderedList fontSize="lg" fontWeight="md" spacing="2">
          <ListItem>마이크를 충분히 가까이 하신 후 시작해주세요.</ListItem>
          <ListItem>발음이 불분명하거나 빠르게 말씀하실 경우 인식이 어려울 수 있습니다.</ListItem>
          <ListItem>답변을 완전히 말씀하신 후 1초 정도 뒤에 버튼을 눌러주세요.</ListItem>
          <ListItem marginBottom="4px">
            아래 버튼을 누르시고 마이크를 통해 목소리가 제대로 인식되는지 확인해주세요.
          </ListItem>
        </UnorderedList>
      </CardBody>
    </Card>
  );
}
