'use client';

import { useRef } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { InterviewingWithVideoView } from '@/components/interview';

interface Props {}

export const AdvancedInterviewing = ({}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoHandler(videoRef);

  return (
    <InterviewingWithVideoView>
      <div>ss</div>
    </InterviewingWithVideoView>
  );
};
