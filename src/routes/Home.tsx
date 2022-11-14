import { Image, Grid, Box, VStack, Text, Heading, HStack, Button, Skeleton, SkeletonText } from "@chakra-ui/react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Room from "../components/Room";
import { useEffect, useState } from "react";

interface Photo {
    pk: number;
    file: string;
    description: string;
}

interface Room {
    pk: number;
    name: string;
    country: string;
    city: string;
    price: number;
    rating: string;
    is_owner: boolean;
    photos: Photo[];
}

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [rooms, setRooms] = useState<Room[]>([]);
    const fetchRooms = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/v1/rooms/")
        const json = await response.json()
        setRooms(json)
        setIsLoading(false);
    }
    useEffect(() => {
        fetchRooms();
    }, [])
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
            {isLoading ? (
                <Box>
                    <Skeleton rounded={"2xl"} height={250} mb={3}></Skeleton>
                    <SkeletonText noOfLines={3}></SkeletonText>
                </Box>
            ) : (null)}
            {rooms.map(room => <Room
                ImageUrl={
                    `https://source.unsplash.com/random/450x${450 + room.pk}`
                }
                name={room.name}
                rating={room.rating}
                city={room.city}
                country={room.country}
                price={room.price}
            />)}

        </Grid >
    )
}