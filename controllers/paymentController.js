const CryptoJS = require("crypto-js");
const keys = require("../config/keys");
const db = require("../models");
var nodemailer = require('nodemailer');
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
    let hashedUrl = CryptoJS.HmacSHA256(req.body.url, keys.richCore.privateKey).toString(CryptoJS.enc.Hex)
    // console.log("hashedUrl controller", hashedUrl)
    res.json({hashed: hashedUrl})
  },
  generateRefNo: (req, res) => {
    db.refNo
      .find({})
      .then(dbModel => {
        // console.log(dbModel[0].refNo)
        let referenceNumber = dbModel[0].refNo + 1
        // console.log(referenceNumber)
        db.refNo
          .update({"refNo": referenceNumber})
          .then(dbModel => {
            // console.log(dbModel)
            res.json({refNo: referenceNumber}) 
          })
          .catch(err => res.status(422).json(err));
      }).catch(err => res.status(422).json(err));
  },
  initiateOrder: (req, res) => {
    // console.log("order",req.body)

    db.richCoreOrders
      .create(req.body)
      .then(dbModel => {
        res.json(dbModel)
      })
      //return err for err handling
      .catch(err => res.json(err));
  },
  paymentFB: (req, res) => {
    console.log("notifyUrl", req.params)
    console.log("notifyUrl",req.body)
    res.json({"message": "notifyUrl"})
  },
  handleReturnUrl: (req, res) => {
    // console.log("returnUrl", req.url)    
    // console.log("returnUrl", req.query)    
    let toHash = `amount=${req.query.amount}&coin=${req.query.coin}&comment=${req.query.comment}&payState=${req.query.payState}&refNo=${req.query.refNo}&serialNumber=${req.query.serialNumber}&tradeState=${req.query.tradeState}`
    // console.log(toHash)
    let toCompare = CryptoJS.HmacSHA256(toHash, keys.richCore.privateKey).toString(CryptoJS.enc.Hex)
    // console.log(toCompare)
    if (toCompare === req.query.sign) {
      // console.log("verified")
      db.richCoreOrders
        .findOneAndUpdate({ refNo: req.query.refNo }, req.query)
        .then(dbModel => {
          console.log(dbModel)
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'dentsoftucb@gmail.com',
              pass: keys.gmail.psw
            }
          });
          
          var mailOptions = {
            from: 'dentsoftucb@gmail.com',
            to: dbModel.email,
            subject: `Thank you for Registering Class in American Claude University`,
            text: `Thank you for Registering Class in American Claude University! 
            your order reference number is ${req.query.refNo} 
            Paid Amount = ${req.query.amount} ${req.query.coin}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.send("Payment Successful, a confirmation message will be sent to your email. Please close this window")
        })
        .catch(err => res.status(422).json(err));
    }

  }
};
