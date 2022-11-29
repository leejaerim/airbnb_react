import { Box, Button, Divider, HStack, VStack, Text } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";
export default function SocialLogin() {
  const kakaoParameter = {
    client_id: "reference https://developers.kakao.com/console/app",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakaoParameter).toString();
  console.log(params);
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
          {" "}
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=198ea19e1de6f2a2bdc9&scope=read:user,user:email"
          leftIcon={<FaGithub></FaGithub>}
          colorScheme={"telegram"}
        >
          Continew with github
        </Button>
        <Button
          as="a"
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          leftIcon={<FaComment></FaComment>}
          colorScheme={"yellow"}
        >
          Continew with kakao
        </Button>
      </VStack>
    </Box>
  );
}
