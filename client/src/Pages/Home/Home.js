import React from "react";
import { NavLink } from "react-router-dom";
import "./home.scss";
import ingredients from "../../img/main_pizza.png";
// we made this page to be the auth page in case we want to add users managment
import Navs from "../../components/Navs/Navs";
function Home() {
  return (
    <div className="main">
      <img className="main_image" src={ingredients}></img>
      <Navs title={"Pizza Factory"}></Navs>
      <main className="main_home">
        <h1 className="main_title">Welcome to the Pizza Factory</h1>
        <h2>Please Select a Page</h2>

        <div className="main_home-buttons_container">
          <NavLink className="main_home-link" to="/toppings">
            <div className="main_home-link_button">Toppings Page</div>
          </NavLink>
          <NavLink className="main_home-link" to="/Pizzas">
            <div className="main_home-link_button">Pizza Page</div>
          </NavLink>
        </div>
      </main>
    </div>
  );
}

export default Home;
