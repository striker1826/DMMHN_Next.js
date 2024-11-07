import { Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

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
