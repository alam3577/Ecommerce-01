const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");
const express_async_handler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const Product = require("./modal/productModal");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();

// connect to mongodb database using mongoose module

mongoose.connect(
  "mongodb+srv://root:root@cluster0.g3f4w.mongodb.net/ecom-9am?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

// handle the server side error

app.use((err, req, res, next) => {
  res.status(500).send({ err: err.message });
});

// create the get request

app.get(
  "/api/products",
  express_async_handler(async (req, res) => {
    const products = await Product.find();
    res.send(products);
  }),
);

//assign the port number
let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server started");
});
