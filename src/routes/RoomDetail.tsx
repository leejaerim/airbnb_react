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
  Button, InputLeftElement, Input, InputGroup, FormLabel, Select, FormControl,
} from "@chakra-ui/react";

import {useMutation, useQuery} from "@tanstack/react-query";
import {FaStar, FaUserAlt} from "react-icons/fa";
import { useParams } from "react-router-dom";
import {checkBooking, getRoom, getRoomReView, IUploadReview, uploadReview} from "../api";
import { IReview, IRoomDetail } from "../types";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useUser from "../lib/useUser";
import {useForm} from "react-hook-form";
import RatingStars from "../components/RatingStar";
export default function RoomDetail() {
  const [rating, setRating] = useState(0);
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const { register, handleSubmit } = useForm<IUploadReview>();
  // how to get param data.
  const { roomPk } = useParams();
  const { userLoading, user, isLoggedIn} = useUser();
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
  const mutation = useMutation(uploadReview,{
    onSuccess:(data)=>{
      console.log(data)
    }
  })
  const onSubmit = (data: IUploadReview)=>{
    if(roomPk)
      mutation.mutate({...data,'roomPk': roomPk, 'rating':rating});
  }
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
                <HStack>
                  <Avatar
                    name={review.user.name}
                    src={review.user.avatar}
                    size="md"
                  ></Avatar>
                    <Heading fontSize={"md"}>{review.user.name}</Heading>
                    <HStack spacing={1}>
                      <FaStar size={"12px"} />
                      <Text>{review.rating}</Text>
                    </HStack>
                  <Text>{review.payload}</Text>
                </HStack>
            ))}
          </Grid>
          <Button mt={"20px"}> Next </Button>
          <HStack mt={"20px"}  spacing={'5'} as="form"
                   onSubmit={handleSubmit(onSubmit)}>
          <InputGroup width={'100%'}>
            <InputLeftElement
                children={
                  <Box color="gray.400">
                    <Avatar
                        name={user?.username}
                        src={user?.avatar}
                        size="md"
                    ></Avatar>
                  </Box>
                }
            />
            <Input
                variant={"filled"}
                placeholder=""
                {...register("payload", { required: true })}
            />
            <RatingStars  rating={rating} onChange={handleRatingChange} />
            <Button
                type="submit"
                disabled={ isLoading || !isLoggedIn }
                size={"md"}
                w="50%"
                colorScheme={"red"}
            >
              Register Review
            </Button>
          </InputGroup>
          </HStack>
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
        ) : <Text color="Green.500">Booked</Text>}
      </Box>
    </Box>
  );
}
