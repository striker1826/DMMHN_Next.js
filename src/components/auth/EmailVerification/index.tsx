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
} from '@chakra-ui/react';
import { verifyEmail } from '@/mutation/verifyEmail';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

export default function EmailVerification() {
  const [email, setEmail] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(180);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    setEmail(email);
    setIsError(!EMAIL_REGEX.test(email));
  };

  const startTimer = () => {
    setTimeLeft(180);
    setTimer(
      window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000),
    );
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const isVerified = await verifyEmail(formData);
      if (isVerified) {
        startTimer();
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('인증 실패:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft === 0 && timer) {
      clearInterval(timer);
      setTimer(null);
      alert('타이머가 만료되었습니다. 다시 시도해 주세요.');
    }
  }, [timeLeft, timer]);

  const reset = () => {
    setEmail('');
    setIsError(false);
    setTimeLeft(180);
  };

  return (
    <Flex width="full" mt="10px" mb="20px">
      <FormControl>
        <form action={formData => handleSubmit(formData)}>
          <FormLabel fontSize="lg" fontWeight="semibold" mb="15px">
            조금만 더 진행해 주세요! <br />
            간편 로그인 후 처음 한 번만 이메일 인증이 필요합니다. :{')'}
          </FormLabel>
          <InputGroup>
            <Input
              type="email"
              placeholder="이메일 주소를 입력해 주세요."
              isInvalid={isError}
              isDisabled={!!timer}
              value={email}
              name="email"
              onChange={handleInputChange}
              variant="flushed"
              borderColor="gray.400"
              pr="70px"
            />
            <InputRightElement width="70px">
              {timeLeft === 0 ? (
                <Button onClick={reset} colorScheme="blue" size="sm">
                  다시시도
                </Button>
              ) : (
                <Button
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isError || email === '' || !!timer}
                  colorScheme="green"
                  size="sm"
                >
                  {timer
                    ? `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(
                        timeLeft % 60,
                      ).padStart(2, '0')}`
                    : '인증하기'}
                </Button>
              )}
            </InputRightElement>
          </InputGroup>
          <FormHelperText textColor="gray.500">
            입력하신 이메일은 인증 목적으로만 사용되며, 다른 용도로는 절대 활용되지 않습니다.
            안심하고 입력해 주세요!
          </FormHelperText>
        </form>
      </FormControl>
    </Flex>
  );
}
