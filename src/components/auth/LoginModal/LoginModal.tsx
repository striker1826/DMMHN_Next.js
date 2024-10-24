'use client';

import styles from './LoginModal.module.scss';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { modalStore } from '@/shared/store/modalStore';
import Link from 'next/link';
import Image from 'next/image';

const LoginModal = () => {
  const { key, isOpen, closeModal } = modalStore(); // isOpen과 closeModal 추가

  return (
    <Modal isOpen={isOpen && key === 'login'} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent className={styles.modal_layout}>
        <ModalHeader>
          <h1 className={styles.title}>로그인 하기</h1>
        </ModalHeader>
        <ModalBody className={styles.content}>
          <Link
            className={styles.kakao_wrap}
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=https://dmmhn-next-js.vercel.app/kakao/redirect&response_type=code`}
          >
            <Image fill src="/kakao_login_medium_wide.png" alt="kakao_btn" />
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
