'use client';

import { useCallback, useEffect, useState } from 'react';
import { postFeedback, postTotalFeedback } from '@/queries/feedback';
import { extractStrings } from '@/shared/utils/extractStrings';
import { Button, Flex, Heading, HStack, Spinner } from '@chakra-ui/react';
import FeedbackCard from '@/components/feedback/FeedbackCard';
import { RxReset } from 'react-icons/rx';

interface Props {
  interviewResult: { question: string; answer: string }[];
  accessToken?: string;
  handleClickReset: () => void;
}

export const Feedback = ({ interviewResult, accessToken, handleClickReset }: Props) => {
  const [feedbacks, setFeedbacks] = useState<{ good: string; bad: string }[]>([]);
  // const [totalFeedback, setTotalFeedback] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(interviewResult);
  const handleFeedback = useCallback(async () => {
    try {
      const feedback = await postFeedback({ accessToken, QnAList: interviewResult });
      setFeedbacks(feedback);

      // const feedbackStrArr = extractStrings(feedback);
      // const feedbackObj = feedbackStrArr.map(string => ({ evaluation: string }));

      // const total = await postTotalFeedback({
      //   accessToken,
      //   totalFeedback: feedbackObj,
      // });

      // setTotalFeedback(total);
    } catch (error) {
      console.error('피드백 로딩 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
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

  const goToCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  const isLastPage = currentIndex === feedbacks.length - 1;

  return (
    <Flex direction="column" justify="space-around" align="center" boxSize="100%" gap="20px">
      {/* 현재 피드백 받을 문제 */}
      <Flex width="100%" padding="10px" boxShadow="lg" borderRadius="xl" align="center">
        {!isLastPage && (
          <Flex
            justify="center"
            align="center"
            padding="10px"
            bgColor="green.600"
            color="green.50"
            borderRadius="xl"
            fontWeight="600"
            fontSize="28px"
            width="70px"
          >
            Q{currentIndex + 1}
          </Flex>
        )}

        <div className="text-left w-full text-[16px] font-[600]">
          {interviewResult[currentIndex].question}
        </div>
      </Flex>

      {/* 피드백 카드 */}
      {/* Desktop */}
      <div className="hidden r-lg:block">
        <Flex width="100%" align="center" height="345px" justify="center" gap="30px">
          <>
            <FeedbackCard
              heading="잘하셨어요!"
              body={feedbacks[currentIndex].good}
              cardType="good"
            />
            <FeedbackCard
              heading="아쉬운 점은..."
              body={feedbacks[currentIndex].bad}
              cardType="bad"
            />
          </>
        </Flex>
      </div>

      {/* Mobile */}
      <div className="block r-lg:hidden">
        <Flex width="100%" align="center" direction={'column'} justify="center" gap="30px">
          <>
            <div className="hidden r-lg:block">
              <FeedbackCard
                heading="잘하셨어요!"
                body={feedbacks[currentIndex].good}
                cardType="good"
              />
              <FeedbackCard
                heading="아쉬운 점은..."
                body={feedbacks[currentIndex].bad}
                cardType="bad"
              />
            </div>

            <div className="block r-lg:hidden flex flex-col items-center gap-[16px] border border-[2px] p-4">
              <FeedbackCard
                heading="잘한점을 보려면 클릭!"
                body={feedbacks[currentIndex].good}
                cardType="good"
              />
              <FeedbackCard
                heading="아쉬운 점을 보려면 클릭!"
                body={feedbacks[currentIndex].bad}
                cardType="bad"
              />
            </div>
          </>
        </Flex>
      </div>

      {/* 페이지네이션 컨트롤 */}
      <Flex justify="space-between" align="center" width="100%">
        <Button
          onClick={goToPrev}
          isDisabled={currentIndex === 0}
          colorScheme="green"
          color="green.900"
          fontSize="20px"
          fontWeight="700"
          variant="ghost"
          boxShadow="lg"
          padding="10px 20px"
        >
          이전
        </Button>
        <HStack>
          {Array.from({ length: feedbacks.length }).map((_, index) => (
            <Button
              key={index}
              onClick={() => goToCurrentIndex(index)}
              colorScheme={currentIndex === index ? 'green' : 'blackAlpha'}
              height="6px"
            />
          ))}
        </HStack>
        <Button
          onClick={goToNext}
          isDisabled={isLastPage}
          colorScheme="green"
          color="green.900"
          fontSize="20px"
          fontWeight="700"
          variant="ghost"
          boxShadow="lg"
          padding="10px 20px"
        >
          다음
        </Button>
      </Flex>

      {isLastPage && (
        <>
          <Button
            className="hidden r-lg:block"
            onClick={() => handleClickReset()}
            variant="arrowRight"
          >
            <RxReset />
          </Button>
          {/* <button className="mt-[20px]">면접 다시보기</button> */}
        </>
      )}
    </Flex>
  );
};
