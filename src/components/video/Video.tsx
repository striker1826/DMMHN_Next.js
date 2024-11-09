import { useVideoHandler } from '@/models/simulation/video';
import { Flex, AbsoluteCenter } from '@chakra-ui/react';
import { useRef } from 'react';

const Video = () => {
  const videoRef = useRef(null);
  useVideoHandler(videoRef);

  return (
    <Flex w="80%" h="100%" justifyContent="center" alignItems="center">
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          width: '100%',
          height: '100%',
          aspectRatio: '16 / 9',
          transform: 'scaleX(-1)',
          objectFit: 'cover', // 화면을 꽉 채우도록 설정
        }}
      />
    </Flex>
  );
};

export default Video;
