'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { Checkbox, CheckboxGroup, Divider, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { GoArrowRight } from 'react-icons/go';

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

interface Props {
  setIsAccepted: (value: boolean) => void;
}

const Policy = ({ setIsAccepted }: Props) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(POLICY_MAP.length).fill(false),
  );

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  useEffect(() => {
    setIsAccepted(allChecked);
  }, [allChecked, setIsAccepted]);

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
    <Flex flexDirection="column" backgroundColor="white">
      <CheckboxGroup colorScheme="green">
        <Flex width="270px">
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
            <Flex key={text} alignItems="center" justifyContent="space-between" width="270px">
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
    </Flex>
  );
};

export default Policy;
