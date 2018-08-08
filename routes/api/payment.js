const router = require("express").Router();
const paymentController = require("../../controllers/paymentController");

router.route("/hash")
  .post(paymentController.hash);

router.route("/")
  .post(paymentController.makePayment)
  .get(paymentController.getKeys);

router.route("/success")
  .post(paymentController.paymentFB);

module.exports = router;