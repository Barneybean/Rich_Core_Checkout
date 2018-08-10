const router = require("express").Router();
const paymentController = require("../../controllers/paymentController");

router.route("/hash")
  .post(paymentController.hash);

router.route("/")
  .post(paymentController.makePayment)
  .get(paymentController.getKeys);

router.route("/refno")
  .get(paymentController.generateRefNo)

router.route("/courseids")
  .get(paymentController.hashCourseIds)

router.route("/success/?*")
  .post(paymentController.paymentFB)
  .get(paymentController.handleReturnUrl);

module.exports = router;