const router = require("express").Router();
const coursesController = require("../../controllers/coursesController");

router
  .route("/")
  .get(coursesController.findAll)
  .post()
 

module.exports = router;
