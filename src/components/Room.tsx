import { Image, Text, Box, VStack, Button, Grid, HStack, useColorModeValue } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
// tyscript에게 타입 알려주기 
interface RoomProps {
    name: string; ImageUrl: string; rating: number; city: string; country: string; price: number; pk: number;

}

export default function Room({ pk, name, ImageUrl, rating, city, country, price }: RoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300")

    return (
        <Link to={`/rooms/${pk}`}>
            <VStack spacing={0} alignItems={"flex-start"}>
                <Box position={"relative"} overflow={"hidden"} rounded="3xl">
                    <Image h={250} w={300} src={ImageUrl}>
                    </Image>
                    <Button variant={"unstyled"} position={"absolute"} top={0} right={0} color="white">
                        <FaRegHeart fontSize={15} />
                    </Button>
                </Box>
                <Box>
                    <Grid gap={2} templateColumns={"5fr 1fr"}>
                        <Text as="b" fontSize="md" noOfLines={2}>
                            {name}
                        </Text>
                        <HStack color="gray" _hover={{ color: "red" }} spacing={1}>
                            <FaStar size={15} />
                            <Text>{rating}</Text>
                        </HStack>
                    </Grid>
                    <Text fontSize="sm" color={gray}> {city}, {country}</Text>
                    <Text fontSize="sm" color={gray}>
                        <Text as="b">${price} </Text>/ night
                    </Text>
                </Box>
            </VStack>
        </Link>
    )
}