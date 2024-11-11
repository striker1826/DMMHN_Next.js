'use client';

import { ChangeEvent, useEffect, useState, useTransition } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useVerifyStore } from '@/shared/store/verifyStore';
import { send, verify } from '@/mutation/verifyEmail';

interface Props {
  setActiveStep: (step: number) => void;
  activeStep: number;
}

export default function VerifyForm({ setActiveStep, activeStep }: Props) {
  const { email, setCode } = useVerifyStore();
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [timer, setTimer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;

    setVerifyCode(code);
  };

  const handleResendVerifyCode = async () => {
    startTransition(async () => {
      const isVerifyCode = await send(email);
      if (!isVerifyCode) {
        toast({
          title: '인증 코드를 재전송하는데 실패했습니다! 다시 한 번 시도해 주세요.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }

      startTimer();
      toast({
        title: '인증 코드가 재전송되었습니다.',
        status: 'success',
        colorScheme: 'blue',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const handleVerify = async (formdata: FormData) => {
    const code = formdata.get('code')?.toString();

    startTransition(async () => {
      if (!email || !code) return;
      const isVerifyCode = await verify({ email, code });
      if (!isVerifyCode) {
        toast({
          title: '인증에 실패하였습니다.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setCode(code);
        toast({
          title: '인증에 성공하였습니다.',
          status: 'success',
          colorScheme: 'blue',
          duration: 3000,
          isClosable: true,
        });
        setActiveStep(activeStep + 1);
      }
    });
  };

  const startTimer = () => {
    setTimeLeft(180);
    setTimer(
      window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000),
    );
  };

  useEffect(() => {
    if (!timer) startTimer();

    if (timeLeft === 0 && timer) {
      clearInterval(timer);
      setTimer(null);
      alert('타이머가 만료되었습니다. 다시 시도해 주세요.');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, timer]);

  return (
    <Flex flexDirection="column" gap="5px" width="full" height="full" mt="10px" mb="20px">
      <form
        action={formData => handleVerify(formData)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <FormControl>
          <FormLabel fontSize="xl" fontWeight="bold">
            메일로 보내드린 인증 코드 6자리를 입력해 주세요!
          </FormLabel>
          <InputGroup>
            <Input
              type="text"
              name="code"
              value={verifyCode}
              placeholder="인증 코드를 입력해 주세요."
              variant="flushed"
              maxLength={6}
              onChange={handleInputChange}
              borderColor="gray.400"
              pr="70px"
            />
            <InputRightElement>
              <Text fontSize="sm">
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                {String(timeLeft % 60).padStart(2, '0')}
              </Text>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>
            <Flex alignItems="center">
              <Text fontSize="sm">문제가 생기셨나요? </Text>
              <Button
                onClick={handleResendVerifyCode}
                variant="none"
                padding="none"
                isLoading={isPending}
                size="sm"
                fontSize="sm"
                mt="1px"
                pr="2px"
                textDecoration="underline"
                _hover={{ color: 'blue.500' }}
              >
                이메일 재전송
              </Button>
            </Flex>
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          isLoading={isPending}
          isDisabled={!verifyCode}
          colorScheme="green"
          size="lg"
        >
          제출
        </Button>
      </form>
    </Flex>
  );
}
