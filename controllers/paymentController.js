const axios = require('axios');
const CryptoJS = require("crypto-js");
const keys = require("../config/keys");
// Defining methods for the coursesController.
module.exports = {
  getKeys: (req, res) => {
    // console.log(keys.richCore.merchantKey)
    let merchantKey = {
      merchantKey: keys.richCore.merchantKey
    } 
    res.json(merchantKey)
  },
  hash: (req, res) => {
    // console.log("hash Controller", req.body)
    // console.log(keys.richCore.privateKey)
    let hashedUrl = CryptoJS.HmacSHA256(req.body.url, keys.richCore.privateKey).toString(CryptoJS.enc.Hex)
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
    console.log("notifyUrl", req.params)
    console.log("notifyUrl",req.body)
    res.send({"message": "notifyUrl"})
  },
  handleReturnUrl: (req, res) => {
    console.log("returnUrl", req.body)    
    console.log("returnUrl", req.params.status)    
    res.json({"message": "returnUrl"})
  }
};
