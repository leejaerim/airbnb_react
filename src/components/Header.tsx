import {
  HStack,
  IconButton,
  Button,
  Box,
  useDisclosure,
  useColorMode,
  LightMode,
  useColorModeValue,
  Stack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  ToastId,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logout } from "../api";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUp";

export default function Header() {
  const { userLoading, user, isLoggedIn } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.300");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logout, {
    onMutate: () => {
      toastId.current = toast({
        title: "Good Bye!",
        description: "See you",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(["me"]);
        toast.update(toastId.current, {
          status: "success",
          title: "done",
          description: "see you!",
        });
      }
    },
  });
  const onlogOut = async () => {
    //await logout();
    mutation.mutate();
  };
  return (
    <Stack
      justifyContent={"space-between"}
      px={"40"}
      py={"10"}
      borderBottomWidth={1}
      alignItems="center"
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 3,
        md: 0,
      }}
    >
      <Box color={logoColor}>
        <FaAirbnb size={"38"} />
      </Box>
      <HStack spacing={"10px;"}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon></Icon>}
        ></IconButton>
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button color="red.500" onClick={onLoginOpen}>
                Login
              </Button>
              <LightMode>
                <Button colorScheme={"red"} onClick={onSignUpOpen}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <>
                <MenuButton>
                  <Avatar size={"md"} src={user.avatar}></Avatar>
                </MenuButton>
                <MenuList>
                  {user?.is_host ? (
                    <Link to="/rooms/upload">
                      <MenuItem>Upload room</MenuItem>
                    </Link>
                  ) : null}
                  <MenuItem onClick={onlogOut}>Log out</MenuItem>
                </MenuList>
              </>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
