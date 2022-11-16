import { Box, Grid, Heading, Skeleton, Image, GridItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../types";

export default function RoomDetail() {
    // how to get param data.
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom)
    console.log(data)

    return (
        <Box mt={8} rounded="lg" overflow={"hidden"} px={{ base: 10, lg: 10, }}>
            <Skeleton height={"43px"} width="25%" isLoaded={!isLoading}>
                <Heading>{data?.name}</Heading>
            </Skeleton>
            <Grid
                gap={3}
                height="60vh" templateRows={"1fr 1fr"}
                templateColumns={"repeat(4,1fr)"}>
                {[1, 2, 3, 4, 5].map((photo) => (
                    <GridItem colSpan={photo === 1 ? 2 : 1} rowSpan={photo === 1 ? 2 : 1} key={photo} overflow={"hidden"}>
                        <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                            <Image w="100%" h="100%" objectFit={"cover"} src={`https://source.unsplash.com/random/450x${450 + photo}`}></Image>
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    )
}