const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/claude_university"
);

const coursesSeed = 
  [
    {
      name: "Blockchain in Real Estate",
      courseCode: "BCA-BRE-1303",
      tokenValue: 40000
    },
    {
      name: "Blockchain in Fintech",
      courseCode: "BCA-BF-1302",
      tokenValue: 40000
    },
    {
      name: "Block Chain Overview",
      courseCode: "BCA-BRE-1301",
      tokenValue: 40000
    }
  ]

db.courses
  .remove({})
  .then(() => db.courses.collection.insertMany(coursesSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
