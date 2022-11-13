import { Image, Grid, Box, VStack, Text, Heading, HStack, Button, Skeleton, SkeletonText } from "@chakra-ui/react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Room from "../components/Room";


export default function Home() {
    return (
        <Grid mt={10} px={{
            base: 10,
            lg: 40
        }} columnGap={4} rowGap={10} templateColumns={{
            sm: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
            xl: "repeat(4, 1fr)",
            "2xl": "repeat(5, 1fr)",
        }} >
            <Box>
                <Skeleton rounded={"2xl"} height={250} mb={3}></Skeleton>
                <SkeletonText noOfLines={3}></SkeletonText>
            </Box>
            <Room></Room>
        </Grid >
    )
}