'use client';

import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { postFeedback, postTotalFeedback } from '@/queries/feedback';
import { extractStrings } from '@/shared/utils/extractStrings';
import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import FeedbackCard from '@/components/feedback/FeedbackCard';

interface Props {
  interviewResult: { question: string; answer: string }[];
  accessToken?: string;
}

export const Feedback = ({ interviewResult, accessToken }: Props) => {
  const [feedbacks, setFeedbacks] = useState<{ good: string; bad: string }[]>([]);
  const [totalFeedback, setTotalFeedback] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleFeedback = useCallback(async () => {
    const feedback = await postFeedback({ accessToken, QnAList: interviewResult });
    setFeedbacks(feedback);

    const feedbackStrArr = extractStrings(feedback);
    const feedbackObj = feedbackStrArr.map(string => ({ feedback: string }));

    const total = await postTotalFeedback({
      accessToken,
      totalFeedback: feedbackObj,
    });

    setTotalFeedback(total);
  }, [accessToken, interviewResult]);

  useEffect(() => {
    handleFeedback();
  }, [handleFeedback]);

  const goToNext = () => {
    if (currentIndex < feedbacks.length) setCurrentIndex(prev => prev + 1);
  };

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  if (!feedbacks.length) {
    return <p>결과가 없습니다!</p>;
  }

  const isLastPage = currentIndex === feedbacks.length;

  return (
    <Flex direction="column" justify="center" align="center" boxSize="100%" gap="15px">
      {/* 현재 피드백 받을 문제 */}
      <Flex justify="left" width="100%">
        <Heading>{interviewResult[currentIndex].question}</Heading>
      </Flex>

      {/* 피드백 카드 */}
      <Flex width="100%" align="center" justify="center" gap="40px">
        {!isLastPage ? (
          <>
            <FeedbackCard heading="잘하셨어요!" body={feedbacks[currentIndex].good} />
            <FeedbackCard heading="아쉬운 점은..." body={feedbacks[currentIndex].bad} />
          </>
        ) : (
          <FeedbackCard heading="정리하자면..." body={totalFeedback} />
        )}

        {isLastPage && (
          <Flex
            flexDirection="column"
            width="330px"
            height="440px"
            align="center"
            justify="center"
            gap="30px"
          >
            <Link as={NextLink} href="/" fontSize="24px" fontWeight="600">
              홈으로
            </Link>
            <Button fontSize="24px" fontWeight="600" padding="30px" colorScheme="green">
              녹화본 저장
            </Button>
          </Flex>
        )}
      </Flex>

      {/* 페이지네이션 컨트롤 */}
      <Flex justify="space-between" align="center" width="100%">
        <Button
          onClick={goToPrev}
          isDisabled={currentIndex === 0}
          colorScheme="green"
          variant="outline"
        >
          이전
        </Button>
        <Text>
          {currentIndex + 1} / {feedbacks.length + 1}
        </Text>
        <Button onClick={goToNext} isDisabled={isLastPage} colorScheme="green" variant="outline">
          다음
        </Button>
      </Flex>
    </Flex>
  );
};
