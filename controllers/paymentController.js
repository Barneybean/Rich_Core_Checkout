const db = require("../models");
const axios = require('axios');
var CryptoJS = require("crypto-js");

// Defining methods for the coursesController.
module.exports = {
  hash: (req, res) => {
    // console.log("hash Controller", req.body)
    let hashedUrl = CryptoJS.HmacSHA256(req.body.url, "E617f9Cc1986Fd57f672FC5EFd42d3DaB4eE6493d8D40C3CDdDC826fB192Ed06").toString(CryptoJS.enc.Hex)
    // console.log("hashedUrl controller", hashedUrl)
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
