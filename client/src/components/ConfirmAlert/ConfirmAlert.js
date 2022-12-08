import React from "react";
import "./confirm_alert.scss";
import InputModal from "../InputModal/InputModal";

function ConfirmAlert(props) {
  const { onConfirm } = props;
  // define default values in case of a bad usage
  const defaultCancel = () => console.log("cancel function");
  const defaultConfirm = () => console.log("confirm function");

  const onHide = onConfirm.onCancel || defaultCancel;
  const onConfirmfn = onConfirm.onConfirm || defaultConfirm;

  return (
    <InputModal styleData={{ maxWidth: "400px" }} hidemodal={onHide}>
      <div className="topping_input-title">{onConfirm.title || ""}</div>
      <div className="confirmation-message">{onConfirm.message}</div>
      <div className="topping_input-buttonsContainer">
        <button
          className="topping_input-button topping_input-buttonYes"
          onClick={onConfirmfn}
        >
          {onConfirm.yesButton || "Confirm"}
        </button>
        <button
          className="topping_input-button topping_input-buttonNo"
          onClick={onHide}
        >
          {onConfirm.noButton || "Cancel"}
        </button>
      </div>
    </InputModal>
  );
}

export default ConfirmAlert;
