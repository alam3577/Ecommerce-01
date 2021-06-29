// import jason web tokens

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  console.log("This is token User", user);
  return jwt.sign({ user }, "alam5827", { expiresIn: "30d" });
};

module.exports = generateToken;
