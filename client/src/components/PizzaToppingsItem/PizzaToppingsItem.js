import React from "react";
import "./pizza_toppings_item.scss";
import { useState } from "react";

function PizzaToppingsItem(props) {
  const [isChecked, setIsChecked] = useState(props.topping.used);

  const toppingCheck = (toppingId) => {
    props.updateToppingsStates(!isChecked, toppingId);
    setIsChecked(!isChecked);
  };
  return (
    <li className="toppings_list-item">
      <div>{props.topping.name}</div>
      <div className="check-box">
        <input
          type="checkbox"
          checked={props.topping.used}
          onChange={() => {
            toppingCheck(props.topping._id);
          }}
        />
      </div>
    </li>
  );
}

export default PizzaToppingsItem;
