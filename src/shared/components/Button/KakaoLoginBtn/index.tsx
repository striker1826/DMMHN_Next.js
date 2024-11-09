import NextLink from 'next/link';
import Image from 'next/image';
import { Flex, Link, Text } from '@chakra-ui/react';

export default function KakaoLoginBtn() {
  return (
    <Link
      as={NextLink}
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`}
      backgroundColor="#FEE500"
      borderRadius="12px"
      width="350px"
      height="70px"
      _hover={{ backgroundColor: '#CDB900' }}
    >
      <Flex gap="10px" width="full" height="full" justifyContent="center" alignItems="center">
        <Image width={36} height={36} src="/kakao_simbol.png" alt="kakao_simbol" />
        <Text color="#000000 85%" fontSize="x-large">
          카카오 로그인
        </Text>
      </Flex>
    </Link>
  );
}
