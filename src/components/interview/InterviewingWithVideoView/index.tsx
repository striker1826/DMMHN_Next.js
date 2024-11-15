import { Flex } from '@chakra-ui/react';
import Video from '@/components/video/Video';

interface Props {
  children: React.ReactNode;
}

export function InterviewingWithVideoView({ children }: Props) {
  return (
    <Flex flexDirection="column" justifyContent="center" gap="20px" width="full" height="full">
      <Flex gap="20px" width="full" height="full">
        <Flex
          flex="3"
          borderRadius="xl"
          backgroundColor="black"
          height="full"
          flexShrink="1"
          overflow="hidden"
        >
          <Video />
        </Flex>
        <Flex flex="2" flexDirection="column" gap="16px">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
