import Calendar from "react-calendar";
import {
  Text,
  Box,
  Grid,
  Heading,
  Skeleton,
  Image,
  GridItem,
  VStack,
  HStack,
  Avatar,
  Container,
  Button,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { checkBooking, getRoom, getRoomReView } from "../api";
import { IReview, IRoomDetail } from "../types";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
export default function RoomDetail() {
  // how to get param data.
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData, isLoading: isReviewsReview } = useQuery<IReview[]>(
    [`rooms`, roomPk, `reviews`],
    getRoomReView
  );
  const [dates, setDates] = useState<Date[]>();
  const { data: checkBookingData, isLoading: isCheckBooking } = useQuery(
    ["check", roomPk, dates],
    checkBooking,
    { cacheTime: 0, enabled: dates !== undefined }
  );

  return (
    <Box mt={8} rounded="lg" overflow={"hidden"} px={{ base: 10, lg: 10 }}>
      <Helmet>
        <title>{data ? data.name : "Loading...."}</title>
      </Helmet>
      <Skeleton height={"43px"} width="25%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        gap={3}
        height="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4,1fr)"}
      >
        {[1, 2, 3, 4, 5].map((photo) => (
          <GridItem
            colSpan={photo === 1 ? 2 : 1}
            rowSpan={photo === 1 ? 2 : 1}
            key={photo}
            overflow={"hidden"}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              <Image
                w="100%"
                h="100%"
                objectFit={"cover"}
                src={`https://source.unsplash.com/random/450x${450 + photo}`}
              ></Image>
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack justifyContent={"space-between"} mt={10}>
        <VStack>
          <Heading fontSize={"xl"}> House Hosted by {data?.owner.name}</Heading>
          <HStack justifyContent={"flex-start"} w="100%">
            <Text>
              {data?.toilets} toliet {data?.toilets === 1 ? "" : "s"}{" "}
            </Text>
            <Text>-</Text>
            <Text>
              {data?.rooms} Room{data?.rooms === 1 ? "" : "s"}
            </Text>
          </HStack>
        </VStack>
        <Avatar
          name={data?.owner.name}
          size={"xl"}
          src={data?.owner.avatar}
        ></Avatar>
      </HStack>
      <Box mt={10}>
        <Heading mb={5} fontSize={"2xl"}>
          <HStack>
            <FaStar />
            <Text>{data?.rating}-</Text>
            <Text>
              {reviewsData?.length} review{" "}
              {reviewsData?.length === 1 ? "" : "s"}
            </Text>
          </HStack>
        </Heading>
        <Container mt={15} maxW="container.lg" marginX={"none"}>
          <Grid gap={10} templateColumns={"1fr 1fr"}>
            {reviewsData?.map((review, index) => (
              <VStack alignItems={"flex-start"} key={index}>
                <HStack>
                  <Avatar
                    name={review.user.name}
                    src={review.user.avatar}
                    size="md"
                  ></Avatar>
                  <VStack>
                    <Heading fontSize={"md"}>{review.user.name}</Heading>
                    <HStack spacing={1}>
                      <FaStar size={"12px"} />
                      <Text>{review.rating}</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Text>{review.payload}</Text>
              </VStack>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box>
        <Calendar
          onChange={setDates}
          prev2Label={null}
          next2Label={null}
          minDetail="month"
          maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
          minDate={new Date()}
          selectRange
        />
        <Button
          disabled={checkBookingData?.ok}
          isLoading={isCheckBooking && dates !== undefined}
          mt={5}
          w="100%"
          colorScheme={"red"}
        >
          MakeBooking
        </Button>
        {!isCheckBooking && !checkBookingData?.ok ? (
          <Text color="red.500">Can't Book</Text>
        ) : null}
      </Box>
    </Box>
  );
}
