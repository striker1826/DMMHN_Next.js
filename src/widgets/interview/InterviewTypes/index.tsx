import { Button, Flex, Heading } from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';

export const InterviewTypes = () => {
  return (
    <>
      <Heading fontSize="28px">면접 방식을 선택해 주세요!</Heading>
      <Flex width="100%" height="100%" justifyContent="space-around" alignItems="center">
        <Button variant="circle">Default</Button>
        <Button variant="circle">More type</Button>
      </Flex>
      <Button variant="arrowRight">
        <SlArrowRight />
      </Button>
    </>
  );
};
