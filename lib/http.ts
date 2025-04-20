import axios from "axios";

const http = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
