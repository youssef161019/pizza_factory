import React from "react";
import "./pizza.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { motion, useIsPresent } from "framer-motion";

function Pizza(props) {
  const isPresent = useIsPresent();
  const animations = {
    style: { position: isPresent ? "static" : "absolute" },
    // whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    initial: { scale: 0.7, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.2, opacity: 0 },
    transition: { type: "spring", stiffness: 900, damping: 40 },
  };

  const updatePizza = (event) => {
    event.stopPropagation();
    props.showPizzaUpdater(props._id);
  };
  const removePizza = (event) => {
    event.stopPropagation();
    props.removePizza(props._id);
  };
  const toppingslist = () => {
    return props.toppings.map((topping, index) => (
      <span
        key={index}
        className={
          topping.removed
            ? "pizza_item-topping non_available"
            : "pizza_item-topping"
        }
      >
        {topping.name}
      </span>
    ));
  };

  return (
    <motion.li {...animations} className="pizza_item" onClick={updatePizza}>
      <div className="pizza_item-header" >
        <span className="pizza_item-title">{props.name}</span>
        <div className="pizza_item-control">
          <div
            className="icon_container"
            title="Edit Pizza"
          >
            <FontAwesomeIcon className="topping-icon" icon={faPen} />
          </div>
          <div
            className="icon_container remove"
            title="Remove Pizza"
             onClick={removePizza}
          >
            <FontAwesomeIcon className="topping-icon " icon={faTrashCan} />
          </div>
        </div>
      </div>
      <div className="pizza_item-toppingsList">
        <span className="pizza_item-toppingsList_sous">Toppings:</span>
        {!!props.toppings.length && toppingslist()}
        {!props.toppings.length && (
          <span className="pizza_item-topping">No Toppings on This Pizza</span>
        )}
      </div>
    </motion.li>
  );
}

export default Pizza;
