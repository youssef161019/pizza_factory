import React from "react";
import "./topping_input_modal.scss";
import { createRef, useState, useEffect } from "react";
import InputModal from "../InputModal/InputModal";

function ToppingInput(props) {
  let isNewTopping = !Object.keys(props.selectedTopping).length;
  const inputData = createRef();
  const [errorMessage, setErrorMessage] = useState("");

  const hideModal = () => {
    props.hideOverlay();
    clearErrorField();
  };

  const submitInput = (event) => {
    event.preventDefault();
    let submitionValue = inputData.current.value.toLowerCase().trim();
    if (submitionValue) {
      !isNewTopping && submitionValue === props.selectedTopping.name
        ? hideModal()
        : props.submitTopping(submitionValue, props.selectedTopping._id);
      return;
    }
    setErrorMessage("Please enter a valid value");
  };

  const clearErrorField = () => {
    if (errorMessage) setErrorMessage("");
  };

  useEffect(() => {
    if (props.inputError) {
      setErrorMessage(props.inputError);
    }
  }, [props.inputError]);
  return (
    <InputModal hidemodal={hideModal} styleData={{ maxWidth: "400px" }}>
      <h3 className="topping_input-title">
        {isNewTopping ? "Please enter a new Topping" : "Update Topping"}
      </h3>
      <form className="topping_input-form" onSubmit={submitInput}>
        <label className="topping_input-label">
          Topping Name:
          <input
            ref={inputData}
            defaultValue={isNewTopping ? "" : props.selectedTopping.name}
            onFocus={clearErrorField}
            className="topping_input-input"
            placeholder="Topping Name"
            type="text"
          />
        </label>
      </form>
      {errorMessage && (
        <div className="topping_input-Error">{errorMessage}</div>
      )}
      <div className="topping_input-buttonsContainer">
        <button
          className="topping_input-button topping_input-buttonYes"
          onClick={submitInput}
        >
          {isNewTopping ? "Add" : "Update"}
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

export default ToppingInput;
