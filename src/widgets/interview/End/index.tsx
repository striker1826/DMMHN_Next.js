'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { evaluate, totalEvaluate } from '@/queries/evaluation/evaluate';
import { extractStrings } from '@/shared/utils/extractStrings';
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
    <div className={styles.end_container}>
      <ul className={styles.evaluation_container}>
        {result.map(({ good, bad }, index) => (
          <li
            key={index}
            ref={el => {
              evaluationRefs.current[index] = el;
            }}
            className={styles.evaluation_item}
          >
            <div className={styles.evaluation_content}>
              <p className={styles.content_title}>잘하셨어요!</p>
              <p>{good}</p>
            </div>
            <div className={styles.evaluation_content}>
              <p className={styles.content_title}>보완하면 좋을 점은요...</p>
              <p>{bad}</p>
            </div>
          </li>
        ))}
        <li
          ref={el => {
            evaluationRefs.current[result.length] = el;
          }}
          className={styles.evaluation_item}
        >
          <div className={styles.evaluation_content}>
            <p className={styles.content_title}>정리하자면...</p>
            <p>{totalEvaluation}</p>
          </div>
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
    </div>
  );
};
