const router = require("express").Router();

//auth
const googleAuthRoutes = require("./google_auth");

router.use("/googleclientid", googleAuthRoutes);

//sign up, new login route for local and google
const userRoutes = require("./users");

router.use("/user", userRoutes);

const courseRoutes = require("./courses");

router.use("/courses", courseRoutes);

const paymentRoutes = require("./payment");

router.use("/payment", paymentRoutes);


module.exports = router;