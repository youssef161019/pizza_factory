import React from "react";
import { NavLink } from "react-router-dom";
import "./error.scss";
import coolPizza from "../../img/coolPizza.png";

// erro page
function Error() {
  return (
    <div className="error_page">
      <img className="cool_pizza" src={coolPizza}></img>
      <div className="error_page_message"> Oops ! No more pizza for the day.</div>
      <div className="error_page_message_s">Go back to the store to get more.</div>
      <NavLink className="link_gs" to="/">Home</NavLink>
    </div>
  );
}

export default Error;
