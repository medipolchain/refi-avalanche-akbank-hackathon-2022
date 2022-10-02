import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://192.168.43.80:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});