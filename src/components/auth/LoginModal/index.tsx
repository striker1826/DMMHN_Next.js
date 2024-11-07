'use client';

import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { modalStore } from '@/shared/store/modalStore';
import KakaoLoginBtn from '@/shared/components/Button/KakaoLoginBtn';

const LoginModal = () => {
  const { key, isOpen, closeModal } = modalStore();

  return (
    <Modal isOpen={isOpen && key === 'login'} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontSize="2xl" fontWeight="700">
          떨면뭐하니 로그인
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="30px">
          <Flex flexDirection="column" width="full" alignItems="center">
            <KakaoLoginBtn />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
