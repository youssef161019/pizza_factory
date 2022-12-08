const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
  name: {
    type: String,
    required: [true, "the pizza name is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  toppings: [
    {
      name: { type: String },
      topping_data: { type: mongoose.Schema.Types.ObjectId, ref: "Toppings" },
    },
  ],
});

module.exports = mongoose.model("Pizzas", pizzaSchema);
