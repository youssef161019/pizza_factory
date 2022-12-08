import React from "react";
import "./topping.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { motion, useIsPresent } from "framer-motion";

function Topping(props) {
  const isPresent = useIsPresent();
  const animations = {
    style: { position: isPresent ? "static" : "absolute" },
    // whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    initial: { scale: 0.7, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 900, damping: 40 },
  };
  const updateTopping = (event) => {
    event.stopPropagation();
    props.showToppingUpdater(props._id);
  };
  const removeTopping = (event) => {
    event.stopPropagation();
    props.removeTopping(props._id);
  };
  return (
    <motion.li {...animations} className="topping" onClick={updateTopping}>
      <span className="topping-name">{props.name} </span>
      <div className="topping-control">
        <div
          className="icon_container"
          title="Edit topping"
        >
          <FontAwesomeIcon className="topping-icon" icon={faPen} />
        </div>
        <div
          className="icon_container remove"
          title="Remove topping"
          onClick={removeTopping}
        >
          <FontAwesomeIcon className="topping-icon" icon={faTrashCan} />
        </div>
      </div>
    </motion.li>
  );
}

export default Topping;
