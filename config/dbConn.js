const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", () => {console.log("Connected successfully");});
module.exports = connectDB;
