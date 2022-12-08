import axiosClient from "./axiosClient";
import { handleResponse } from "./responseHandler";

const getToppingsList = () =>
  axiosClient.get("/toppings/").then(handleResponse);

const addNewTopping = (data) =>
  axiosClient.post("/toppings/", data).then(handleResponse);

const updateTopping = (toppingId, data) =>
  axiosClient.patch(`/toppings/${toppingId}`, data).then(handleResponse);

const removeTopping = (toppingId) =>
  axiosClient.delete(`/toppings/${toppingId}`).then(handleResponse);

const toppingsApi = {
  getToppingsList,
  addNewTopping,
  updateTopping,
  removeTopping,
};
// create topping api manager responsibe for the toppings calls
export default toppingsApi;
