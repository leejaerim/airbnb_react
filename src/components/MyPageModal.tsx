import {
    Box, Button, Input,
    InputGroup, InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
    Text
} from "@chakra-ui/react";
import React from "react";
import {IUser} from "../types";

interface MyPageProps{
    isOpen : boolean;
    onClose: ()=>void;
    user : IUser
}
// <Modal isOpen={isOpen} onClose={onClose} children={}></Modal>
export const MyPageModal = ({isOpen, onClose, user}:MyPageProps) =>{
    return {isOpen}?(<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>My Page</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                    <Text>{user?.username}</Text>
                    <Text>{user?.gender}</Text>
                    <Text>{user?.name}</Text>
                    <Text>{user?.last_login}</Text>
                </VStack>
                <Button
                    type="submit"
                    mt={4}
                    colorScheme={"red"}
                    w="100%"
                    onClick={onClose}
                >
                    Close
                </Button>
            </ModalBody>
        </ModalContent>
    </Modal>):null;
}
