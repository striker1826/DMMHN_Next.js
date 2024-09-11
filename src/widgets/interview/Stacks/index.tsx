'use client';

import { MouseEventHandler, useState } from 'react';
import styles from './index.module.scss';

const mock_stacks = [
  {
    stackId: '1',
    stack: 'React',
    questionTypeId: '1',
    QuestionType: {
      type: 'FE',
    },
  },
  {
    stackId: '2',
    stack: 'Next.js',
    questionTypeId: '1',
    QuestionType: {
      type: 'FE',
    },
  },
  {
    stackId: '3',
    stack: 'HTML',
    questionTypeId: '1',
    QuestionType: {
      type: 'FE',
    },
  },
  {
    stackId: '4',
    stack: 'CSS',
    questionTypeId: '1',
    QuestionType: {
      type: 'FE',
    },
  },
  {
    stackId: '5',
    stack: 'Express.js',
    questionTypeId: '2',
    QuestionType: {
      type: 'BE',
    },
  },
  {
    stackId: '6',
    stack: 'Nest.js',
    questionTypeId: '2',
    QuestionType: {
      type: 'BE',
    },
  },
  {
    stackId: '7',
    stack: 'Javascript',
    questionTypeId: '3',
    QuestionType: {
      type: '공통',
    },
  },
];

export const Stacks = () => {
  const [currentType, setCurrentType] = useState<string | null>(null);

  const handleClickType: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    setCurrentType(e.currentTarget.name);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <ul className={styles.stack_type}>
          <li>
            <button
              type="button"
              name="FE"
              className={styles.stack_type_btn}
              onClick={handleClickType}
            >
              FE
            </button>
          </li>
          <li>
            <button
              type="button"
              name="BE"
              className={styles.stack_type_btn}
              onClick={handleClickType}
            >
              BE
            </button>
          </li>
        </ul>
        <form>
          <ul className={styles.stack_name_container}>
            {mock_stacks.map(({ stack, stackId, QuestionType }) => (
              <li key={stackId}>
                <button
                  type="button"
                  name={QuestionType.type}
                  className={`${styles.stack_name_btn} ${
                    currentType === QuestionType.type ? styles.active : ''
                  }`}
                >
                  {stack}
                </button>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
};
