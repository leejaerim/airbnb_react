import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <Modal motionPreset="slideInRight" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Login
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400">
                                <FaUserAlt />
                            </Box>} />
                            <Input variant={"filled"} placeholder="username" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400">
                                <FaLock />
                            </Box>} />
                            <Input variant={"filled"} placeholder="password">
                            </Input>
                        </InputGroup>
                    </VStack>
                    <Button mt={4} colorScheme={"red"} w="100%">Login</Button>
                    <SocialLogin></SocialLogin>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}