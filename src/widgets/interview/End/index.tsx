'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { evaluate, totalEvaluate } from '@/queries/evaluation/evaluate';
import { extractStrings } from '@/shared/utils/extractStrings';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import styles from './End.module.scss';

interface Props {
  interviewResult: {
    question: string;
    answer: string;
  }[];
  accessToken?: string;
}

export const End = ({ interviewResult, accessToken }: Props) => {
  const [result, setResult] = useState<{ good: string; bad: string }[]>();
  const [totalEvaluation, setTotalEvaluation] = useState<string>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const evaluationRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleEvaluation = useCallback(async () => {
    const evaluation = await evaluate({ accessToken, QnAList: interviewResult });

    const evaluationStrArr = extractStrings(evaluation);
    const evaluationObj = evaluationStrArr.map(string => {
      return { evaluation: string };
    });

    const totalEvaluation = await totalEvaluate({ accessToken, totalEvaluation: evaluationObj });

    setResult(evaluation);
    setTotalEvaluation(totalEvaluation);
  }, [accessToken, interviewResult]);

  useEffect(() => {
    handleEvaluation();
  }, [handleEvaluation]);

  const scrollToItem = (index: number) => {
    if (evaluationRefs.current[index]) {
      evaluationRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setCurrentIndex(index);
    }
  };

  if (!result) {
    return <p>결과가 없습니다!</p>;
  }

  return (
    <Box className={styles.end_container}>
      <ul className={styles.evaluation_container}>
        {result.map(({ good, bad }, index) => (
          <li
            key={index}
            ref={el => {
              evaluationRefs.current[index] = el;
            }}
            className={styles.evaluation_item}
          >
            <Card width="330px" height="440px">
              <CardHeader>
                <Heading size="lg">잘하셨어요!</Heading>
              </CardHeader>
              <div className={styles.custom_divider_horizontal} />
              <CardBody>
                <Text fontSize="lg" fontWeight="500">
                  {good}
                </Text>
              </CardBody>
            </Card>
            <Card width="330px" height="440px">
              <CardHeader>
                <Heading size="lg">아쉬운 점은...</Heading>
              </CardHeader>
              <div className={styles.custom_divider_horizontal} />
              <CardBody>
                <Text fontSize="lg" fontWeight="500">
                  {bad}
                </Text>
              </CardBody>
            </Card>
          </li>
        ))}
        <li
          ref={el => {
            evaluationRefs.current[result.length] = el;
          }}
          className={styles.evaluation_item}
        >
          <Card width="330px" height="440px">
            <CardHeader>
              <Heading size="lg">정리하자면...</Heading>
            </CardHeader>
            <div className={styles.custom_divider_horizontal} />
            <CardBody>
              <Text fontSize="lg" fontWeight="500">
                {totalEvaluation}
              </Text>
            </CardBody>
          </Card>
          <Flex
            flexDirection="column"
            width="330px"
            height="440px"
            align="center"
            justify="center"
            gap="30px"
            h="100%"
          >
            <Link as={NextLink} href="/" fontSize="24px" fontWeight="600">
              홈으로
            </Link>
            <Button fontSize="24px" fontWeight="600" padding="30px" colorScheme="green">
              녹화본 저장
            </Button>
          </Flex>
        </li>
      </ul>
      <ul className={styles.pagination}>
        {result.map((_, index) => (
          <li
            key={index}
            onClick={() => scrollToItem(index)}
            className={`${styles.pagination_bar} ${currentIndex === index ? styles.active : ''}`} // 현재 인덱스에 따라 스타일 적용
          />
        ))}
        <li
          onClick={() => scrollToItem(result.length)}
          className={`${styles.pagination_bar} ${
            currentIndex === result.length ? styles.active : ''
          }`}
        />
      </ul>
    </Box>
  );
};
