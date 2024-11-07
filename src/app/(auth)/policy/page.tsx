import Policy from '@/components/auth/Policy';
import { Flex } from '@chakra-ui/react';

export default function Page() {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      background="linear-gradient(150deg, #004922 0%, #02632f 40%, #058841 70%)"
    >
      <Policy />
    </Flex>
  );
}
