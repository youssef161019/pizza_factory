import React from "react";
import { useEffect, useState } from "react";
import "./pizzas.scss";
import pizzasApi from "../../api/pizzasApiProvider";
import toppingsApi from "../../api/toppingsApiProvider";

import Loading from "../../components/Loading/Loading";
import Navs from "../../components/Navs/Navs";
import Pizza from "../../components/Pizza/Pizza";
import PizzaInputModal from "../../components/PizzaInputModal/PizzaInputModal";
import { formatPizzasData } from "../../Tools/dataUtils";
import { useToppings } from "../../context/ToppingsContext";
import {verifyPizzaDuplicat}  from "../../Tools/dataUtils";
import ConfirmAlert from "../../components/ConfirmAlert/ConfirmAlert";

function Pizzas() {
  const [pizzasList, setPizzasList] = useState([]);
  const [loadingOn, setLoadingOn] = useState(false);
  const [pizzaInputModal, setPizzaInputModal] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState({});
  const [toppingsList, updateToppingsList] = useToppings([]);
  const [pizzaUploadError, setPizzaUploadError] = useState([]);
  const [onConfirm, setOnConfirm] = useState();

  const showAddPizza = () => {
    setSelectedPizza({});
    showOverlay();
  };

  const showPizzaUpdater = (pizzaId) => {
    let upPizza = pizzasList.find((pizza) => pizza._id === pizzaId);
    if (!upPizza) return;
    setSelectedPizza(upPizza);
    showOverlay();
  };

  const submitPizza = (pizzaData, pizzaId = undefined) => {
    // verify for duplicates as a first step verification
    // second verification will be done on the server side
    // server verification will eliminat the case 2 users add the same pizza from 2 diffrent pages
    let errorsList = verifyPizzaDuplicat(pizzasList, pizzaData, pizzaId);
    if (errorsList.length) {
      setPizzaUploadError(errorsList);
      return;
    }
    setLoadingOn(true);
    pizzaId ? updatePizza(pizzaData, pizzaId) : addNewPizza(pizzaData);
  };

  const addNewPizza = async (pizzaData) => {
    try {
      let newAddedPizza = await pizzasApi.addNewPizza(pizzaData);
      newAddedPizza.toppings = pizzaData.toppings;
      setPizzasList((prevList) => [...prevList, newAddedPizza]);
      setPizzaInputModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingOn(false);
    }
  };

  const updatePizza = async (pizzaData, pizzaId) => {
    try {
      let updatedPizza = await pizzasApi.updatePizza(pizzaId, pizzaData);
      setPizzasList((prevList) =>
        prevList.map((pizza) => {
          if (pizza._id === pizzaId) {
            pizza.name = pizzaData.name;
            pizza.toppings = pizzaData.toppings;
          }
          return pizza;
        })
      );
      setPizzaInputModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingOn(false);
    }
  };

  const hideConfirmation = () => setOnConfirm();

  const removePizza = (pizzaId) => {
    let removalObject = {
      title: "Pizza Removal",
      message: "would you like to remove this pizza from your Pizza list.",
      onCancel: hideConfirmation,
      onConfirm: () => {
        pizzaRemoval(pizzaId);
      },
      yesButton: "Remove",
    };
    setOnConfirm(removalObject);
  };

  const pizzaRemoval = async (pizzaId) => {
    hideConfirmation();
    setLoadingOn(true);
    try {
      const result = await pizzasApi.removePizza(pizzaId);
      if (result.acknowledged) {
        setPizzasList((prevList) =>
          prevList.filter((pizza) => pizza._id !== pizzaId)
        );
      }
    } catch (error) {
      console.error("pizza removal error", error);
    } finally {
      setLoadingOn(false);
    }
  };

  const showOverlay = () => {
    const getToppingsList = async () => {
      try {
        setLoadingOn(true);
        const result = await toppingsApi.getToppingsList();
        updateToppingsList(result);
        setPizzaInputModal(true);
      } catch (error) {
        console.error("toppings list request error", error);
      } finally {
        setLoadingOn(false);
      }
    };
    if (pizzaUploadError.length) setPizzaUploadError([]);
    toppingsList.length ? setPizzaInputModal(true) : getToppingsList();
  };

  const hideOverlay = () => setPizzaInputModal(false);

  useEffect(() => {
    async function getPizzasList() {
      try {
        setLoadingOn(true);
        const result = await pizzasApi.getPizzasList();
        setPizzasList(formatPizzasData(result));
      } catch (error) {
        console.error("pizza list request error", error);
      } finally {
        setLoadingOn(false);
      }
    }
    getPizzasList();
  }, []);
  // make sure the loading screen is hidden after the timeout
  useEffect(() => {
    let loadingTimer;
    if (loadingOn) {
      loadingTimer = setTimeout(setLoadingOn, 4000, false);
    }
    return () => {
      clearTimeout(loadingTimer);
    };
  }, [loadingOn]);

  return (
    <div className="pizzas_page">
      <Navs title={"Pizza Page"} />
      <main className="toppings_list-container">
      <h3 className="list-title">Pizza List :</h3>

        {!pizzasList.length && <div className="no_avalable_item">No Available Pizzas in the store</div>}
        
        <ul className="pizzas_list">
          {pizzasList.map((pizza) => (
            <Pizza
              key={pizza._id}
              {...pizza}
              showPizzaUpdater={showPizzaUpdater}
              removePizza={removePizza}
            />
          ))}
        </ul>

        <button className="Add_new_button Button" onClick={showAddPizza}>Add new Pizza</button>
      </main>
      {pizzaInputModal && (
        <PizzaInputModal
          selectedPizza={selectedPizza}
          hideOverlay={hideOverlay}
          toppingsList={toppingsList}
          submitPizza={submitPizza}
          pizzaUploadError={pizzaUploadError}
        />
      )}
      {loadingOn && <Loading />}

      {onConfirm && <ConfirmAlert onConfirm={onConfirm}></ConfirmAlert>}
    </div>
  );
}

export default Pizzas;
