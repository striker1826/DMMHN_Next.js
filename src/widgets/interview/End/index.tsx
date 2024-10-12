'use client';

import { useRouter } from 'next/navigation';
import styles from './End.module.scss';
import { PiHandsClappingFill } from 'react-icons/pi';
import { useGradingStore } from '@/shared/store/gradingStore';

export const End = () => {
  const router = useRouter();
  const { gradingResult } = useGradingStore();

  const handleIntervewQuit = () => {
    localStorage.removeItem('gradingResult');
    router.push('/');
  };

  return (
    <>
      <div>
        <div>
          <PiHandsClappingFill size="106px" color="#fff" />
          <p>
            면접이 모두 종료되었습니다
            <br /> 수고하셨습니다
          </p>
        </div>
        {gradingResult && (
          <div>
            <ol>
              {gradingResult.map((value: { question: string; score: number }, index: number) => (
                <li key={index}>
                  <p>질문: {value.question}</p>
                  <span>답변: {value.score}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <button onClick={handleIntervewQuit}>종료</button>
    </>
  );
};
