import { Image, Text, Box, VStack, Button, Grid, HStack, useColorModeValue } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
    const gray = useColorModeValue("gray.600", "gray.300")
    return (
        <VStack spacing={0} alignItems={"flex-start"}>
            <Box position={"relative"} overflow={"hidden"} rounded="3xl">
                <Image h={250} w={300} src="https://a0.muscache.com/im/pictures/10da01cc-17a4-4eef-99b8-a3eb9005fba8.jpg?aki_policy=large">
                </Image>
                <Button variant={"unstyled"} position={"absolute"} top={0} right={0} color="white">
                    <FaRegHeart fontSize={15} />
                </Button>
            </Box>
            <Box>
                <Grid gap={2} templateColumns={"5fr 1fr"}>
                    <Text as="b" fontSize="md" noOfLines={2}>
                        독채형, 넓은 정원과 개별 테라스가 있는 따뜻한 감성숙소 1호 원룸(14평형)
                    </Text>
                    <HStack color="gray" _hover={{ color: "red" }} spacing={1}>
                        <FaStar size={15} />
                        <Text>5.0</Text>
                    </HStack>
                </Grid>
                <Text fontSize="sm" color={gray}> Seoul, S.Korea</Text>
                <Text fontSize="sm" color={gray}>
                    <Text as="b">$72 </Text>/ night
                </Text>

            </Box>
        </VStack>
    )
}