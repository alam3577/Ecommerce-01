const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");
const express_async_handler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Product = require("./modal/productModal");
const data = require("./data");
const User = require("./modal/userModel");
const generateToken = require("./token");

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
    // console.log(products);
    res.send(products);
  }),
);

// create get request

// app.get(
//   "/api/products/:id",
//   express_async_handler(async (req, res) => {
//     const product = await Product.findOne({
//       _id: new mongodb.ObjectID(req.params.id),
//     });
//     if (product) {
//       res.status(200).send(product);
//     } else {
//       res.status(400).send({ message: "no product available" });
//     }
//   }),
// );

app.get(
  "/api/products/:id",
  express_async_handler(async (req, res) => {
    // console.log("product Id ", req.params.id);
    const product = await Product.findOne({
      _id: new mongodb.ObjectID(req.params.id),
    });
    if (product) {
      // console.log("Product", product);
      res.status(200).send(product);
    } else {
      console.log("no product found");
      res.status(400).send({ message: "no product available" });
    }
  }),
);

// insert data into to users collection
app.get(
  "/api/users/seed",
  express_async_handler(async (req, res) => {
    await User.remove({});
    const createUsers = await User.insertMany(data.users);
    res.send({ createUsers });
  }),
);

// signin

app.post(
  "/api/users/signin",
  express_async_handler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log("This is user", user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      } else {
        res.status(401).send({ message: "Password is wrong" });
      }
    } else {
      res.status(401).send({ message: "invalid email or user" });
    }
  }),
);

//assign the port number
let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server started");
});
