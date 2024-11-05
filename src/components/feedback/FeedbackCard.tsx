import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  heading: string;
  body?: string;
  cardType: 'good' | 'bad' | 'totalFeedback';
}

export default function FeedbackCard({ heading, body, cardType }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        maxW="lg"
        minHeight="100%"
        height="100%"
        boxShadow="lg"
        borderRadius="xl"
        overflow="hidden"
        cursor="pointer"
        onClick={onOpen}
        transition="all 0.3s ease"
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: 'xl',
        }}
      >
        <CardHeader padding="10px 10px 2.5px 10px">
          <Heading
            bgColor={
              cardType === 'totalFeedback'
                ? 'green.600'
                : cardType === 'good'
                ? 'blue.300'
                : cardType === 'bad'
                ? 'red.300'
                : ''
            }
            color="green.50"
            width="100%"
            padding="15px"
            borderRadius="xl"
            borderBottomRadius="sm"
            size="lg"
          >
            {heading}
          </Heading>
        </CardHeader>
        <CardBody padding="2.5px 10px 10px 10px" overflow="hidden">
          <Text
            width="100%"
            height="100%"
            bgColor={
              cardType === 'totalFeedback'
                ? 'green.100'
                : cardType === 'good'
                ? 'blue.100'
                : cardType === 'bad'
                ? 'red.100'
                : ''
            }
            padding="5px 15px"
            borderRadius="xl"
            borderTopRadius="sm"
            fontSize="xl"
            fontWeight="600"
            color="green.900"
            lineHeight="1.8"
            overflow="hidden"
            noOfLines={7}
          >
            {body}
          </Text>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent padding="8px" height="400px">
          <ModalHeader>
            <Heading size="lg">{heading}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Divider borderWidth="2px" color="green" borderRadius="full" />
          <ModalBody overflowY="auto">
            <Text fontSize="xl" fontWeight="600" lineHeight="1.8">
              {body}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
