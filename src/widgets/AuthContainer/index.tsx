'use client';

import {
  Box,
  Button,
  Flex,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from '@chakra-ui/react';
import Policy from '@/components/auth/Policy';
import EmailVerification from '@/components/auth/EmailVerification';
import VerifyForm from '@/components/auth/VerifyForm';
import { FaChevronLeft } from 'react-icons/fa';

const steps = [
  { title: 'Step 1', description: '이메일 인증' },
  { title: 'Step 2', description: '인증코드 입력' },
  { title: 'Step 3', description: '약관 동의' },
];

export default function AuthContainer() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Flex
      flexDirection="column"
      backgroundColor="white"
      padding="40px"
      paddingTop="50px"
      borderRadius="xl"
      boxShadow="2xl"
      width="470px"
      height="500px"
      gap="30px"
      position="relative"
    >
      <Stepper size="md" colorScheme="green" index={activeStep} width="300px">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator border="1px" borderColor="gray.300">
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            {activeStep === index && (
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
            )}
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Flex height="full">
        {activeStep === 0 && (
          <EmailVerification setActiveStep={setActiveStep} activeStep={activeStep} />
        )}
        {activeStep === 1 && <VerifyForm setActiveStep={setActiveStep} activeStep={activeStep} />}
        {activeStep === 2 && <Policy />}
      </Flex>
      <Button
        variant="ghost"
        size="sm"
        isDisabled={activeStep === 0}
        onClick={() => setActiveStep(activeStep - 1)}
        position="absolute"
        borderRadius="xl"
        top="3"
        left="1"
      >
        <FaChevronLeft fontSize="20px" />
      </Button>
    </Flex>
  );
}
