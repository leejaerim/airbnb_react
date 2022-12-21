import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { formatDate } from "./lib/utils";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});
export const getRooms = () =>
  axiosInstance.get("rooms/").then((response) => response.data);
// export async function getRooms() {
//     const response = await axiosInstance.get(`rooms/`);
//     // == const response = await fetch(`${BASE_URL}/rooms/`);
//     //const json = await response.json()
//     return response.data;
// }
export const getRoom = ({ queryKey }: QueryFunctionContext) =>
  axiosInstance.get(`rooms/${queryKey[1]}`).then((response) => response.data);

export const getRoomReView = ({ queryKey }: QueryFunctionContext) =>
  axiosInstance
    .get(`rooms/${queryKey[1]}/reviews`)
    .then((response) => response.data);

export const getMe = () =>
  axiosInstance.get(`users/me`).then((response) => response.data);

export const logout = () =>
  axiosInstance
    .post(`users/logout`, null, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const githubLogin = (code: string) =>
  axiosInstance
    .post(
      `/users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogin = (code: string) =>
  axiosInstance
    .post(
      `/users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}
export const usernameLogin = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  axiosInstance
    .post(
      `/users/login`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const getAmenities = () =>
  axiosInstance.get(`rooms/amenities`).then((response) => response.data);
export const getCategory = () =>
  axiosInstance.get(`categories`).then((response) => response.data);
export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}
export const uploadRoom = (variables: IUploadRoomVariables) =>
  axiosInstance
    .post(`rooms/`, variables, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
export interface IUploadReview {
    payload : string;
    rating : number;
}
export const uploadReview = (values : IUploadReview)=>
    axiosInstance.post(`rooms/2/reviews`,values, {
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
    }).then((response) => response.data);
export const getUploadURL = () =>
  axiosInstance
    .post(`medias/photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
export interface IUploadImageVarialbes {
  file: FileList;
  uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVarialbes) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};
export interface ICreatePhotoVariables {
  description: string;
  file: string;
  roomPk: string;
}
export const createPhoto = ({
  description,
  file,
  roomPk,
}: ICreatePhotoVariables) =>
  axiosInstance
    .post(
      `rooms/${roomPk}/photos`,
      { description, file },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, roomPk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const Checkin = formatDate(firstDate);
    const Checkout = formatDate(secondDate);
    return axiosInstance
      .get(
        `rooms/${roomPk}/bookings/check?check_in=${Checkin}&check_out=${Checkout}`
      )
      .then((response) => response.data);
  }
};
