import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
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
