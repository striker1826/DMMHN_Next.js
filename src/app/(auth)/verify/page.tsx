import { Flex } from '@chakra-ui/react';
import AuthContainer from '@/widgets/AuthContainer';

export default function Page() {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      background="linear-gradient(150deg, #004922 0%, #02632f 40%, #058841 70%)"
    >
      <AuthContainer />
    </Flex>
  );
}
