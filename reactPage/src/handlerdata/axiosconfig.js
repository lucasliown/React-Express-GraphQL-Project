import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:4000",
  // baseURL: "http://192.168.50.134:4000",
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosConfig;
