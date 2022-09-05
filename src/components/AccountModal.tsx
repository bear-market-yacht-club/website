import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import Identicon from "./Identicon";

type Props = {
  isOpen: any;
  onClose: any;
};

export default function AccountModal({ isOpen, onClose }: Props) {
  const { account } = useEthers();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        background="white"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
        borderRadius="3xl"
      >
        <ModalHeader color="black.400" px={4} fontSize="lg" fontWeight="medium">
          Account
        </ModalHeader>
        <ModalCloseButton
          color="gray.600"
          fontSize="sm"
          _hover={{
            color: "whiteAlpha.700",
          }}
        />
        <ModalBody pt={0} px={4}>
          <Box
            borderRadius="3xl"
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="gray.400" fontSize="sm">
                Connected with MetaMask
              </Text>
            </Flex>
            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
              <Identicon />
              <Text
                color="green.400"
                fontSize="xl"
                fontWeight="semibold"
                ml="2"
                lineHeight="1.1"
              >
                {account &&
                  `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                  )}`}
              </Text>
            </Flex>
            <Flex alignContent="center" m={3}>
              <Button
                variant="link"
                color="gray.400"
                fontWeight="normal"
                fontSize="sm"
                _hover={{
                  textDecoration: "none",
                  color: "black.800",
                }}
              >
                <CopyIcon mr={1} />
                Copy Address
              </Button>
              <Link
                fontSize="sm"
                display="flex"
                alignItems="center"
                href={`https://etherscan.io/address/${account}`}
                isExternal
                color="gray.400"
                ml={6}
                _hover={{
                  color: "black.800",
                  textDecoration: "underline",
                }}
              >
                <ExternalLinkIcon mr={1} />
                View on Explorer
              </Link>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter
          justifyContent="end"
          background="white"
          borderBottomLeftRadius="3xl"
          borderBottomRightRadius="3xl"
          p={6}
        >
          <Text
            color="black.400"
            textAlign="left"
            fontWeight="medium"
            fontSize="md"
          >
            Your transactions willl appear here...
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
