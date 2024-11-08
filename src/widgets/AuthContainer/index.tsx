'use client';

import { useState } from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import Policy from '@/components/auth/Policy';
import EmailVerification from '@/components/auth/EmailVerification';

export default function AuthContainer() {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  return (
    <Flex
      flexDirection="column"
      backgroundColor="white"
      width="500px"
      padding="40px"
      borderRadius="xl"
      boxShadow="2xl"
      gap="30px"
    >
      <Heading>환영합니다!</Heading>
      <EmailVerification setIsVerified={setIsVerified} />
      <Policy setIsAccepted={setIsAccepted} />
      <Button colorScheme="green" disabled={!isAccepted || !isVerified}>
        다음
      </Button>
    </Flex>
  );
}
