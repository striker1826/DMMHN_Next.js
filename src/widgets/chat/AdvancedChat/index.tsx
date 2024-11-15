'use client';

import { useCallback, useRef, useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { ProgressHeader } from '@/components/chat';

export function AdvancedChat() {
  const [progress, setProgress] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const addProgressPercentage = useCallback((percentage: number) => {
    setProgress(prev => prev + percentage);
  }, []);

  const handleToExitChat = () => {};

  return (
    <Flex
      flexDirection="column"
      gap="10px"
      border="1px"
      borderColor="green.600"
      boxShadow="xl"
      borderRadius="xl"
      height="full"
      padding="10px"
      overflow="hidden"
    >
      <ProgressHeader progress={progress} handleToExitChat={handleToExitChat} />
      <Flex ref={chatContainerRef} flexGrow={1} flexDirection="column" gap="10px" overflowY="auto">
        채팅 리스트가 들어갑니다.
      </Flex>
      <Flex borderTop="1px" borderColor="gray.400" w={'full'}>
        <Button
          colorScheme="green"
          variant="solid"
          size="lg"
          paddingY="10px"
          borderRadius="lg"
          borderTop="1px"
          marginTop="8px"
          w={'full'}
        >
          조건 별 텍스트가 들어갑니다.
        </Button>
      </Flex>
    </Flex>
  );
}
