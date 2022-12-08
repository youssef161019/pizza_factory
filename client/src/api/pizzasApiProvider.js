import axiosClient from "./axiosClient";
import { handleResponse } from "./responseHandler";

const getPizzasList = () => axiosClient.get("/pizza/").then(handleResponse);

const addNewPizza = (data) =>
  axiosClient.post("/pizza/", data).then(handleResponse);

const updatePizza = (pizzaId, data) =>
  axiosClient.patch(`/pizza/${pizzaId}`, data).then(handleResponse);

const removePizza = (pizzaId) =>
  axiosClient.delete(`/pizza/${pizzaId}`).then(handleResponse);


const pizzasApi = {
  getPizzasList,
  addNewPizza,
  updatePizza,
  removePizza,
};
// create api manager responsible for the api calls
export default pizzasApi;
