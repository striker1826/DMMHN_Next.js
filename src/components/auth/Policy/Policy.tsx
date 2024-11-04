import { Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';

interface Props {
  policy: { text: string; href: string };
  accept: boolean;
  handleAccept: (policyText: string) => void;
}
const Policy = ({ accept, policy, handleAccept }: Props) => {
  return (
    <Flex alignItems="center" gap={2} key={policy.text} textDecoration="underline">
      <Button
        onClick={() => handleAccept(policy.text)}
        _hover="none"
        border={accept ? '1.5px solid green.400' : '1.5px solid #111'}
        bgColor={accept ? 'green.400' : 'white'}
        height="24px"
        minWidth="24px"
        width="26px"
        padding={0}
        outline="none"
      />
      <Link href={policy.href} target="_blank">
        {policy.text}
      </Link>
    </Flex>
  );
};

export default Policy;
