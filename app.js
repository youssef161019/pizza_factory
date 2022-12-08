"use strict";

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const { address } = require("ip");
var cors = require("cors");
const corsOptions = require('./config/corsOptions')

const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

const toppingsRouter = require("./routes/toppings_route");
const pizzaRouter = require("./routes/pizzas_route");

require("dotenv").config();

const app = express();

let ip = address();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    originAgentCluster: false,
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/toppings", toppingsRouter);
app.use("/api/pizza", pizzaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send({ error: err.message, code: err.status });
});

const PORT = process.env.PORT || 5500;
let isProd = process.env.NODE_ENV === "production";
connectDB();
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {console.log("Connected successfully");});
let server = app.listen(PORT, () => {
  console.log(`Express server listening on ${ip}:${server.address().port}`);
});
