'use client';

import { ChangeEvent, useState, useTransition } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Text,
  useToast,
} from '@chakra-ui/react';
import { send } from '@/mutation/verifyEmail';
import { useVerifyStore } from '@/shared/store/verifyStore';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

interface Props {
  setActiveStep: (step: number) => void;
  activeStep: number;
}

export default function EmailVerification({ setActiveStep, activeStep }: Props) {
  const { email, setEmail } = useVerifyStore();
  const [isError, setIsError] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    setIsError(!EMAIL_REGEX.test(email));
    setEmail(email);
  };

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email')?.toString();

    startTransition(async () => {
      if (!email) return;
      const isVerifyCode = await send(email);
      if (!isVerifyCode) {
        toast({
          title: '인증 코드를 전송하는데 실패했습니다! 다시 한 번 시도해 주세요.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setActiveStep(activeStep + 1);
        toast({
          title: '인증 코드가 전송되었습니다.',
          status: 'success',
          colorScheme: 'blue',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Flex flexDirection="column" gap="5px" width="full" height="full" mt="10px" mb="20px">
      <form
        action={formData => handleSubmit(formData)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <FormControl>
          <FormLabel fontSize="xl" fontWeight="bold">
            간편 로그인 후 처음 한 번만 이메일 인증이 필요합니다 :{')'}
          </FormLabel>
          <InputGroup>
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="이메일 주소를 입력해 주세요."
              isInvalid={isError}
              onChange={handleInputChange}
              variant="flushed"
              borderColor="gray.400"
              pr="70px"
            />
          </InputGroup>
          {isError && (
            <Text fontSize="sm" color="red.500">
              올바른 형식의 이메일로 작성해 주세요.
            </Text>
          )}
          <FormHelperText textColor="gray.500">
            입력하신 이메일은 인증 목적으로만 사용되며, 다른 용도로는 절대 활용되지 않습니다.
            안심하고 입력해 주세요!
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          isLoading={isPending}
          isDisabled={isError || email === ''}
          colorScheme="green"
          size="lg"
        >
          인증하기
        </Button>
      </form>
    </Flex>
  );
}
