import { QueryFunctionContext } from "@tanstack/react-query"
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/"
})
export const getRooms = () =>
    axiosInstance.get("rooms/").then(response => response.data)
// export async function getRooms() {
//     const response = await axiosInstance.get(`rooms/`);
//     // == const response = await fetch(`${BASE_URL}/rooms/`);
//     //const json = await response.json()
//     return response.data;
// }

export const getRoom = ({ queryKey }: QueryFunctionContext) => axiosInstance.get(`rooms/${queryKey[1]}`).then((response) => response.data)

export const getRoomReView = ({ queryKey }: QueryFunctionContext) => axiosInstance.get(`rooms/${queryKey[1]}/reviews`).then((response) => response.data)