import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./navs.scss";

function Navs(props) {
  let [menuData, setMenuData] = useState(false);

  const onToggle = () => {
    setMenuData(!menuData);
  };
  return (
    <nav className={menuData ? "navbar menu-active" : "navbar"}>
      <div className="toppings_nav-title">{props.title}</div>
      <div className="push-left">
        <button
          data-class="menu-active"
          className="hamburger"
          onClick={onToggle}
        >
          <span className="hamburger-line hamburger-line-top"></span>
          <span className="hamburger-line hamburger-line-middle"></span>
          <span className="hamburger-line hamburger-line-bottom"></span>
        </button>

        {/* <!--  Menu compatible with wp_nav_menu  --> */}
        <ul id="primary-menu" className="menu nav-menu">
          <li className="menu-item current-menu-item">
            <NavLink className="toppings_nav-link" to="/">
              <span className="toppings_nav-text">Home</span>
            </NavLink>
          </li>
          <li className="menu-item dropdown">
            <NavLink className="toppings_nav-link" to="/toppings">
              <span className="toppings_nav-text">Toppings</span>
            </NavLink>
          </li>
          <li className="menu-item ">
            <NavLink className="toppings_nav-link" to="/Pizzas">
              <span className="toppings_nav-text">Pizzas</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// function Navs(props) {
//   return (
//     <nav className="toppings_nav">
//       <NavLink className="toppings_nav-link" to="/">
//         <span className="toppings_nav-title">Pizza Factory</span>
//       </NavLink>
//       <div>
//         <NavLink className="toppings_nav-link" to="/">
//           <span className="toppings_nav-text">Home</span>
//         </NavLink>
//         <NavLink className="toppings_nav-link" to="/toppings">
//           <span className="toppings_nav-text">Toppings</span>
//         </NavLink>
//         <NavLink className="toppings_nav-link" to="/Pizzas">
//           <span className="toppings_nav-text">Pizzas</span>
//         </NavLink>
//       </div>
//     </nav>
//   );
// }

export default Navs;
