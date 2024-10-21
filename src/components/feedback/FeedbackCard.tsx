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
}

export default function FeedbackCard({ heading, body }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        width="100%"
        minHeight="100%"
        height="100%"
        boxShadow="md"
        borderRadius="xl"
        overflow="hidden"
        onClick={onOpen}
        transition="all 0.3s ease"
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: 'xl',
        }}
      >
        <CardHeader padding="0 5px 5px">
          <Heading
            bgColor="green.600"
            color="green.50"
            width="100%"
            padding="15px"
            borderRadius="xl"
            borderBottomRadius="none"
            size="lg"
          >
            {heading}
          </Heading>
        </CardHeader>
        <CardBody padding="0 5px 5px">
          <Text
            // height="100%"
            minHeight="100%"
            width="100%"
            bgColor="green.100"
            padding="15px"
            borderRadius="xl"
            borderTopRadius="none"
            fontSize="xl"
            fontWeight="600"
            color="green.900"
            lineHeight="1.8"
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
