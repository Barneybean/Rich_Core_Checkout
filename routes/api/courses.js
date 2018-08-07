const router = require("express").Router();
const coursesController = require("../../controllers/coursesController");

router
  .route("/")
  .get(coursesController.findAll)
  .post()

router 
  .route("/:id")
  .delete(coursesController.remove)

module.exports = router;
