import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    return (
        <Modal motionPreset="slideInRight" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Sign Up
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400">
                                <FaUserAlt />
                            </Box>} />
                            <Input variant={"filled"} placeholder="name" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400">
                                <FaUserAlt />
                            </Box>} />
                            <Input variant={"filled"} placeholder="username" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400">
                                <FaEnvelope />
                            </Box>} />
                            <Input variant={"filled"} placeholder="Email" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400">
                                <FaLock />
                            </Box>} />
                            <Input variant={"filled"} placeholder="password">
                            </Input>
                        </InputGroup>
                    </VStack>
                    <Button mt={4} colorScheme={"red"} w="100%">Sign Up</Button>
                    <SocialLogin></SocialLogin>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}