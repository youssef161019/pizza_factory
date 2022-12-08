const express = require("express");
const router = express.Router();
const pizzasModel = require("../models/pizzas_model");
const { formatPizzaToppings } = require("../utils/dataUtils");
// get pizzas listing.
router.get("/", async (req, res) => {
  try {
    const pizzasList = await pizzasModel
      .find({}, { __v: false })
      .populate("toppings.topping_data");
    res.send(pizzasList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// add new topping
router.post("/", async (req, res) => {
  try {
    let newPizzaData = { toppings: formatPizzaToppings(req.body.toppings) };
    if (req.body.name) newPizzaData.name = req.body.name;
    const newTopping = await pizzasModel.create(newPizzaData);
    res.send(newTopping);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({
        code: error.code,
        mongo_error: error.message,
        duplicatedPizzaNameError: "this pizza is already available",
      });
      return;
    }
    console.log(error.code);
    res.status(500).send({ error: error.message });
  }
});

// update a pizza
router.patch("/:pizzaId", async (req, res) => {
  // check the parrameters to update ["name","toppings"];
  let updater = Object.keys(req.body).reduce((accum, key) => {
    if (key === "name") {
      accum.name = req.body.name.toLowerCase();
    } else if (key === "toppings") {
      accum.toppings = formatPizzaToppings(req.body.toppings);
    }
    return accum;
  }, {});
  if (!Object.keys(updater).length) {
    res.status(400).send({
      code: 103,
      invalidParametersError: "the inserted parametes are not valid",
    });
    return;
  }
  try {
    const updateTopping = await pizzasModel.updateOne(
      { _id: req.params.pizzaId },
      { $set: updater }
    );
    res.send(updateTopping);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).send({
        code: error.code,
        mongo_error: error.message,
        duplicatedToppingsError: "this topping is already available",
      });
      return;
    }
    res.status(500).send({ error: error.message });
  }
});

// delete a pizza
router.delete("/:pizzaId", async (req, res) => {
  try {
    const deletePizza = await pizzasModel.deleteOne({
      _id: req.params.pizzaId,
    });
    res.send(deletePizza);
  } catch (error) {
    // console.log(error);
    res.status(500).send({ error: error.message });
  }
});
module.exports = router;
