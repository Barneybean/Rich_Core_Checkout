const router = require("express").Router();
const coursesController = require("../../controllers/coursesController");

router
  .route("/")
  .get(coursesController.findAll)
  .post(coursesController.create)

router 
  .route("/:id")
  .delete(coursesController.remove)

router
  .route("/photo")
  .post(coursesController.create)

module.exports = router;
