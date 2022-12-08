const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const toppingSchema = new Schema({
  name: {
    type: String,
    required: [true, "the topping name is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
});

module.exports = mongoose.model("Toppings", toppingSchema);
