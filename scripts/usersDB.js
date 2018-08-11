const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/claude_university"
);

const usersSeed = 
  [
    {
    userType: "student",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@gmail.com",
    password: "$2a$04$Sr4OTcuTDWuqE8Aq3kBaGeAM6GKvvx6gMjrSOCikh1LQtfOzh2due",
    imageUrl: " ",
    phone: " ",
    birth_date: " ",
    address: " ",
    city: " ",
    state: " ",
    zip_code: " ",
    // courses: [],
    // richCorePayments:[]
  },
  {
    userType: "admin",
    firstName: "william",
    lastName: "Gao",
    email: "william@gmail.com",
    password: "$2a$04$gFzpag.y4sXnlxwmaXBHYukKwX22e7uvfCKvVnY7njMCxC1XBc8v2",
    imageUrl: " ",
    phone: " ",
    birth_date: " ",
    address: " ",
    city: " ",
    state: " ",
    zip_code: " ",
    // courses: [],
    // richCorePayments:[]
  }
]
  

db.Users
  .remove({})
  .then(() => db.Users.collection.insertMany(usersSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
