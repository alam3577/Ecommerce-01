const bcrypt = require("bcryptjs");

const data = {
  users: [
    {
      name: "sajjad",
      password: bcrypt.hashSync("admin", 8),
      isAdmin: true,
      image: "https://ecom-9am.s3.ap-south-1.amazonaws.com/profile.jpg",
      email: "sajjad@gmail.com",
    },
    {
      name: "alam",
      password: bcrypt.hashSync("admin", 8),
      isAdmin: false,
      image: "https://ecom-9am.s3.ap-south-1.amazonaws.com/profile.jpg",
      email: "alam@gmail.com",
    },
  ],
};

module.exports = data;
