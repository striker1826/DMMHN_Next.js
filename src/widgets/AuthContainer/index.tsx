'use client';

import { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import Policy from '@/components/auth/Policy';

export default function AuthContainer() {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  return (
    <Flex
      flexDirection="column"
      backgroundColor="white"
      padding="20px"
      borderRadius="xl"
      boxShadow="2xl"
      gap="20px"
    >
      <Policy setIsAccepted={setIsAccepted} />
      <Button colorScheme="green" disabled={!isAccepted}>
        다음
      </Button>
    </Flex>
  );
}
