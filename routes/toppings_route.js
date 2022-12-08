const express = require("express");
const router = express.Router();
const toppingsModel = require("../models/toppings_model");

// get toppings list
router.get("/", async (req, res) => {
  try {
    const toppings = await toppingsModel.find({},{__v: false,});
    res.send(toppings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// add new topping
router.post("/", async (req, res) => {
  try {
    const newTopping = await toppingsModel.create(req.body);
    res.send(newTopping);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({
        code: error.code,
        mongo_error: error.message,
        duplicatedToppingError: "this topping is already available",
      });
      return;
    }
    console.log(error.code);
    res.status(500).send({ error: error.message });
  }
});
// update a topping
router.patch("/:toppingId", async (req, res) => {
  try {
    const updateTopping = await toppingsModel.updateOne(
      { _id: req.params.toppingId },
      { $set: { name: req.body.name } }
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
// delete a topping
router.delete("/:toppingId", async (req, res) => {
  try {
    const updateTopping = await toppingsModel.deleteOne({
      _id: req.params.toppingId,
    });
    res.send(updateTopping);
  } catch (error) {
    // console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
