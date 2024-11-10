'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GoArrowRight } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import { updateEmail } from '@/mutation/user/updateEmail';
import { useVerifyStore } from '@/shared/store/verifyStore';

const POLICY_MAP = [
  {
    href: 'https://rain-baker-cf9.notion.site/12f00426ddd5800a8e16d2b2a9a6239f',
    text: '서비스 이용약관 (필수)',
  },
  {
    href: 'https://rain-baker-cf9.notion.site/12f00426ddd580f998b7cd301abd38e2',
    text: '개인정보 처리 동의서 (필수)',
  },
  {
    href: 'https://rain-baker-cf9.notion.site/12f00426ddd580dfba8ff3b752dd9db7',
    text: '개인정보 처리방침 (필수)',
  },
];

const Policy = () => {
  const router = useRouter();
  const { email, code } = useVerifyStore();
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(POLICY_MAP.length).fill(false),
  );

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleIndividualChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = e.target.checked;
    setCheckedItems(updatedCheckedItems);
  };

  const handleAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckedItems(new Array(POLICY_MAP.length).fill(checked));
  };

  return (
    <Flex
      width="full"
      height="full"
      justifyContent="space-between"
      flexDirection="column"
      backgroundColor="white"
      mt="10px"
    >
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb="20px">
          정말 수고하셨습니다. <br />
          벌써 마지막 단계입니다!
        </Text>
        <CheckboxGroup colorScheme="green">
          <Flex width="full">
            <Checkbox
              border="1px gray"
              mr="10px"
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={handleAllChange}
            />
            <Text>약관 전체동의</Text>
          </Flex>
          <Divider borderColor="gray.400" my="10px" />
          <Stack spacing={2}>
            {POLICY_MAP.map(({ text, href }, index) => (
              <Flex key={text} alignItems="center" justifyContent="space-between" width="full">
                <Flex>
                  <Checkbox
                    border="1px gray"
                    mr="10px"
                    isChecked={checkedItems[index]}
                    onChange={handleIndividualChange(index)}
                  />
                  <Text>{text}</Text>
                </Flex>
                <Link as={NextLink} href={href} isExternal _hover={{ color: 'blue.500' }}>
                  <GoArrowRight />
                </Link>
              </Flex>
            ))}
          </Stack>
        </CheckboxGroup>
      </Box>
      <Button
        onClick={() => {
          updateEmail(email, code);
          router.replace('/interview');
        }}
        isDisabled={!allChecked}
        colorScheme="green"
        size="lg"
      >
        시작!
      </Button>
    </Flex>
  );
};

export default Policy;
