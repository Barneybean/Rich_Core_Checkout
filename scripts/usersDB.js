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
      email: "williamgao@usjus.org",
      password: "$2a$04$fyfJsJeWsN.6Jqcj9FyjDu3VDtQ1C0kbECuEqUtSMwjt/S/cIswdi",
      imageUrl: " ",
      phone: " ",
      birth_date: " ",
      address: " ",
      city: " ",
      state: " ",
      zip_code: " "
    },
    {
      userType: "admin",
      firstName: "Claude",
      lastName: "Wang",
      email: "claudewang@usjus.org",
      password: "$2a$04$ML3tk26z0KKhXk.IqBloQuBCjoVCYdH3rE/.0K/ANT1M1IGG2AIp.",
      imageUrl: " ",
      phone: " ",
      birth_date: " ",
      address: " ",
      city: " ",
      state: " ",
      zip_code: " "
    },
    {
      userType: "admin",
      firstName: "Jim",
      lastName: "Chen",
      email: "jimchen@usjus.org",
      password: "$2a$04$ZVm3HstMitpSFeLiEqqTOOIHKdNYmVDl9vr/FTg7XpHcw9nZ58Owy",
      imageUrl: " ",
      phone: " ",
      birth_date: " ",
      address: " ",
      city: " ",
      state: " ",
      zip_code: " "
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
