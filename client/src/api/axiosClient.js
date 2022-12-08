import axios from "axios";

const TIME_OUT = 4000;
// create an axios client responsible for the api calls
const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: TIME_OUT,
});
export default axiosClient;
