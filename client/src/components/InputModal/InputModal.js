import React from "react";
import "./input_modal.scss";

function InputModal(props) {
  const onHide = (event) => {
    if (
      event.target.className.includes("input-overlay") &&
      typeof props.hidemodal === "function"
    ) {
      props.hidemodal();
    }
  };
  return (
    <div className="input-overlay" onClick={onHide}>
      <div className="input-conatiner" style={props.styleData}>
        {props.children}
      </div>
    </div>
  );
}

export default InputModal;
