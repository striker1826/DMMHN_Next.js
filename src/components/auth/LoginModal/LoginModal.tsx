'use client';

import styles from './LoginModal.module.scss';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { modalStore } from '@/shared/store/modalStore';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Policy from '../Policy/Policy';

const POLICY_MAP = [
  {
    href: 'https://rain-baker-cf9.notion.site/12f00426ddd5800a8e16d2b2a9a6239f',
    text: '서비스 이용약관',
  },
  {
    href: 'https://rain-baker-cf9.notion.site/12f00426ddd580f998b7cd301abd38e2',
    text: '개인정보 처리 동의서',
  },
  {
    href: 'https://rain-baker-cf9.notion.site/12f00426ddd580dfba8ff3b752dd9db7',
    text: '개인정보 처리방침',
  },
];

const LoginModal = () => {
  const { key, isOpen, closeModal } = modalStore(); // isOpen과 closeModal 추가
  const [isAllAccept, setIsAllAccept] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState<{ [key: string]: boolean }>({
    '서비스 이용약관': false,
    '개인정보 처리 동의서': false,
    '개인정보 처리방침': false,
  });

  const handleChangeAccept = (policyText: string) => {
    setAcceptPolicy(prev => {
      return {
        ...prev,
        [policyText]: !prev[policyText],
      };
    });
  };

  useEffect(() => {
    const allAccepted = Object.values(acceptPolicy).every(value => value === true);
    console.log('allAccepted', acceptPolicy);
    setIsAllAccept(allAccepted);
  }, [acceptPolicy]);

  return (
    <Modal isOpen={isOpen && key === 'login'} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent className={styles.modal_layout}>
        <ModalHeader>
          <h1 className={styles.title}>로그인 하기</h1>
        </ModalHeader>
        <ModalBody className={styles.content}>
          <Flex direction="column" alignItems="flex-start" width="100%" gap={1}>
            {POLICY_MAP.map(policy => (
              <div key={policy.text}>
                <Policy
                  policy={policy}
                  accept={acceptPolicy[policy.text]}
                  handleAccept={handleChangeAccept}
                />
              </div>
            ))}
          </Flex>
          <Link
            className={isAllAccept ? styles.kakao_wrap : styles.kakao_wrap_not_active}
            onClick={e => {
              if (!isAllAccept) e.preventDefault(); // 비활성화 시 클릭 방지
            }}
            href={
              isAllAccept
                ? `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`
                : ''
            }
          >
            <Image fill src="/kakao_login_medium_wide.png" alt="kakao_btn" />
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
