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
      tokenValue: 40000,
      courseImage: "https://res.cloudinary.com/dozulwrpg/image/upload/v1532735508/Bitcoin.jpg",
      courseDetail: "This course talks about customary and effective use of Java.  We systematically present advice on how to write clean and reusable code, with solid object-oriented structure, following proved design patterns.  We will talk what works, what doesn't, how to use Java and its libraries to best effect. Real code and API examples are run and examined."
    },
    {
      name: "Blockchain in Fintech",
      courseCode: "BCA-BF-1302",
      tokenValue: 40000,
      courseImage: "https://res.cloudinary.com/dozulwrpg/image/upload/v1532715743/CourseList/blockchain_4.png",
      courseDetail: "This course talks about customary and effective use of Java.  We systematically present advice on how to write clean and reusable code, with solid object-oriented structure, following proved design patterns.  We will talk what works, what doesn't, how to use Java and its libraries to best effect. Real code and API examples are run and examined."
    },
    {
      name: "Block Chain Overview",
      courseCode: "BCA-BRE-1301",
      tokenValue: 40000,
      courseImage: "https://res.cloudinary.com/dozulwrpg/image/upload/v1532715743/CourseList/blockchain.png",
      courseDetail: "This course talks about customary and effective use of Java.  We systematically present advice on how to write clean and reusable code, with solid object-oriented structure, following proved design patterns.  We will talk what works, what doesn't, how to use Java and its libraries to best effect. Real code and API examples are run and examined."
    },
    {
      name: "Block Chain Coding",
      courseCode: "BCA-BRE-1304",
      tokenValue: 30000,
      courseImage: "https://res.cloudinary.com/dozulwrpg/image/upload/v1532715743/CourseList/cryptocurrency_4.png",
      courseDetail: "This course talks about customary and effective use of Java.  We systematically present advice on how to write clean and reusable code, with solid object-oriented structure, following proved design patterns.  We will talk what works, what doesn't, how to use Java and its libraries to best effect. Real code and API examples are run and examined."
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
