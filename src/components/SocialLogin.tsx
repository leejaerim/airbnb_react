import { Box, Button, Divider, HStack, VStack, Text } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
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
          href="https://github.com/login/oauth/authorize?client_id=&scope=read:user,user:email"
          leftIcon={<FaGithub></FaGithub>}
          colorScheme={"telegram"}
        >
          Continew with github
        </Button>
        <Button leftIcon={<FaComment></FaComment>} colorScheme={"yellow"}>
          Continew with kakao
        </Button>
      </VStack>
    </Box>
  );
}
