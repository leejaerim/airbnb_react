import { Box, Button, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaAirbnb } from "react-icons/fa"
export default function Root() {
    return (
        <Box>
            <HStack justifyContent={"space-between"} px={"5"} py={"10"} borderBottomWidth={1}>
                <Box color="red.500">
                    <FaAirbnb size={"38"} />
                </Box>
                <HStack spacing={"10px;"}>
                    <Button color="red.500">Login</Button>
                    <Button colorScheme={"red"}>Sign up</Button>
                </HStack>
            </HStack>
            <Outlet></Outlet>
        </Box >
    )
}