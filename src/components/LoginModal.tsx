import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event?.preventDefault();
  };
  return (
    <Modal motionPreset="slideInRight" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={onSubmit as any}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.400">
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input
                required
                name="username"
                onChange={onChange}
                value={username}
                variant={"filled"}
                placeholder="username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.400">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                required
                type="password"
                name="password"
                onChange={onChange}
                value={password}
                variant={"filled"}
                placeholder="password"
              ></Input>
            </InputGroup>
          </VStack>
          <Button type="submit" mt={4} colorScheme={"red"} w="100%">
            Login
          </Button>
          <SocialLogin></SocialLogin>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
