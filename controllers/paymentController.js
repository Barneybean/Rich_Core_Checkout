const db = require("../models");
const sha256 = require("sha256");
const axios = require('axios');

// Defining methods for the coursesController.
module.exports = {
  hash: (req, res) => {
    // console.log("hash Controller", req.body)
    let hashedUrl = sha256(req.body.url)
    console.log(hashedUrl)
    res.json({hashed: hashedUrl})
  },
  makePayment: (req, res) => {
    // console.log("make Payment", req.body)
    axios.get(req.body.finalUrl)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  paymentFB: (req, res) => {
    console.log(req )
  }
};
