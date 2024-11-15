import { Button, Flex, Progress } from '@chakra-ui/react';

interface Props {
  progress: number;
  handleToExitChat: () => void;
}

export function ProgressHeader({ progress, handleToExitChat }: Props) {
  return (
    <Flex gap="12px" borderBottom="1px" borderColor={'gray.400'} paddingBottom="8px">
      <Progress
        borderRadius="8px"
        value={progress}
        width="100%"
        height="20px"
        hasStripe
        isAnimated
        minHeight="20px"
        colorScheme="green"
        min={0}
        max={100}
      />
      <Button
        onClick={handleToExitChat}
        colorScheme="green"
        borderRadius="8px"
        opacity="0.5"
        size="xs"
        _hover={{ opacity: '1' }}
      >
        면접 종료
      </Button>
    </Flex>
  );
}
