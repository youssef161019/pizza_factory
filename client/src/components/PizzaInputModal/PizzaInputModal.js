import React from "react";
import "./pizza_input_modal.scss";
import { useEffect, useState, createRef } from "react";
import InputModal from "../InputModal/InputModal";
import { pizzaToppingsState } from "../../Tools/dataUtils";
import PizzaToppingsItem from "../PizzaToppingsItem/PizzaToppingsItem";

function PizzaInputModal(props) {
  const isNewPizza = !Object.keys(props.selectedPizza).length;
  const defaultPizzaToppings = isNewPizza
    ? []
    : props.selectedPizza.toppings.filter(
        (topping) => !topping.removed && topping._id
      );

  const pizzaNameInput = createRef();

  const [availableToppings, setAvailableToppings] = useState(
    pizzaToppingsState(defaultPizzaToppings, props.toppingsList)
  );
  const [nameError, setNameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hideModal = () => props.hideOverlay();

  const updateToppingsStates = (state, toppingId) => {
    let newToppingsState = availableToppings.map((topping) => {
      if (topping._id === toppingId) {
        topping.used = state;
      }
      return topping;
    });
    clearErrorMessage();
    setAvailableToppings(newToppingsState);
  };

  const clearErrorMessage = () => errorMessage && setErrorMessage("");
  
  const submitPizza = (event) => {
    event.preventDefault();
    let pizzaName = pizzaNameInput.current.value.trim();
    if (!pizzaName) {
      setNameError(true);
      setErrorMessage("Pizza Name is Required.");
      return;
    }
    let newToppingsList = availableToppings
      .filter((topping) => topping.used)
      .map((topping) => ({ _id: topping._id, name: topping.name }));
    props.submitPizza(
      { name: pizzaName.toLowerCase(), toppings: newToppingsList },
      props.selectedPizza._id
    );
  };

  useEffect(() => {
    if (props.toppingsList.length !== availableToppings.length) {
      setAvailableToppings(
        pizzaToppingsState(defaultPizzaToppings, props.toppingsList)
      );
    }
  }, [props.toppingsList]);

  useEffect(() => {
    if (props.pizzaUploadError.length) {
      let [error, payload] = props.pizzaUploadError;
      switch (error) {
        case "name":
          setNameError(true);
          setErrorMessage(
            `The name ${pizzaNameInput.current.value.toLowerCase()} is already used`
          );
          break;
        case "toppings":
          setErrorMessage(
            `This toppings list is already used by ${payload.name}`
          );
          break;
        default:
          break;
      }
    }
  }, [props.pizzaUploadError]);

  return (
    <InputModal hidemodal={hideModal} styleData={{ maxWidth: "500px" }}>
      <h3 className="pizza_input-title">
        {isNewPizza ? "Add New Pizza" : "Update Pizza"}
      </h3>
      <form className="pizza_input-form">
        <label className="pizza_input-field">
          <span className="pizza_input-label required_field">Pizza Name:</span>
          <input
            onFocus={() => {
              setNameError(false);
              clearErrorMessage();
            }}
            ref={pizzaNameInput}
            defaultValue={isNewPizza ? "" : props.selectedPizza.name}
            className={
              nameError
                ? "topping_input-input name_input_error"
                : "topping_input-input"
            }
            placeholder="Pizza Name"
            type="text"
            required
          />
        </label>
      </form>

      <div className="pizza_input-list">
        <span className="pizza_input-label">Toppings List:</span>
        {!availableToppings.length && (
          <span className="pizza_input-list_empty">
            {" "}
            No available toppings to Add
          </span>
        )}
        {!!availableToppings.length && (
          <ul className="toppings_list-conatiner">
            {availableToppings.map((topping, index) => (
              <PizzaToppingsItem
                key={index}
                topping={topping}
                updateToppingsStates={updateToppingsStates}
              />
            ))}
          </ul>
          // <PizzaToppingsList availableToppings={availableToppings} />
        )}
      </div>
      <div className="topping_input-message  required_field">
        {" "}
        Indicates a required field
      </div>
      {errorMessage && (
        <div className="topping_input-message error_message">
          {errorMessage}
        </div>
      )}
      <div className="topping_input-buttonsContainer">
        <button
          className="topping_input-button topping_input-buttonYes"
          onClick={submitPizza}
        >
          {isNewPizza ? "Add" : "Update"}
        </button>
        <button
          className="topping_input-button topping_input-buttonNo"
          onClick={hideModal}
        >
          Cancel
        </button>
      </div>
    </InputModal>
  );
}

export default PizzaInputModal;
