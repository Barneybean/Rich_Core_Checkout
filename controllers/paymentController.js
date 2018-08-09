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
    console.log("returnUrl", req.query)    
    // hashstring and compare then handle result
//     { refNo: '000000020180808000007',
// [0]   serialNumber: '-Ew88puSEei5uwpUiRW4Zg',
// [0]   amount: '2.00000000',
// [0]   coin: 'RCTFF',
// [0]   comment: 'william_gao_williamgao@gmail.com',
// [0]   payState: 'PAY',
// [0]   tradeState: 'SUCCESS',
// [0]   sign: '963d32dea31af8c6644745159e45699d1005180391e2e843bb674ea822e93531' }

    // parse amount, refNo to number

    res.send("Payment Successful, please close this window")
  }
};
