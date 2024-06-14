const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/todoController");

router
  .route("/")
  .get(todoController.getToDoList)
  .post(todoController.addNewTask);

router
  .route("/:id")
  .put(todoController.updateTodo)
  .delete(todoController.deleteTodo);

router.route("/:id/").get(todoController.getTodo);

module.exports = router;
