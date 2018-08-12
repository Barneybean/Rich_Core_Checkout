const router = require("express").Router();
const paymentController = require("../../controllers/paymentController");

router.route("/hash")
  .post(paymentController.hash);

router.route("/")
  .get(paymentController.getKeys);

router.route("/refno")
  .get(paymentController.generateRefNo)

router.route("/order")
  .post(paymentController.initiateOrder)

router.route("/success/?*")
  .post(paymentController.paymentFB)
  .get(paymentController.handleReturnUrl);

router.route("/allhistory")
  .get(paymentController.loadAllPaymentHistory);

module.exports = router;