import {
  Text,
  Heading,
  VStack,
  Spinner,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../api";

export default function KakoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //code has to be changed for access token by sending code to django
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      console.log(code);
      return null;
      //   const status = await kakaoLogin(code);
      //   if (status == 200) {
      //     toast({
      //       title: "Welcome",
      //       status: "success",
      //       description: "Hello",
      //       position: "bottom-right",
      //     });
      //     queryClient.refetchQueries(["me"]);
      //     navigate("/");
      //}
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt="40">
      <Heading>Processing log in ...</Heading>
      <Text> Don't go anywhere</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
