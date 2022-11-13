import { HStack, IconButton, Button, Box, useDisclosure, useColorMode, LightMode, useColorModeValue } from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUp";

export default function Header() {
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.300");
    const Icon = useColorModeValue(FaMoon, FaSun)
    return (
        <HStack justifyContent={"space-between"} px={"5"} py={"10"} borderBottomWidth={1}>
            <Box color={logoColor}>
                <FaAirbnb size={"38"} />
            </Box>
            <HStack spacing={"10px;"}>
                <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={<Icon></Icon>}></IconButton>
                <Button color="red.500" onClick={onLoginOpen}>Login</Button>
                <LightMode>
                    <Button colorScheme={"red"} onClick={onSignUpOpen}>Sign up</Button>
                </LightMode>
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </HStack>
    )
}