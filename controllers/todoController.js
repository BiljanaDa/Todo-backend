const ToDoList = require("../model/ToDoList");
const ToDoLIst = require("../model/ToDoList");

const getToDoList = async (req, res) => {
  const todoList = await ToDoList.find();
  if (!todoList) return res.status(204).json({ message: "List not found" });
  res.json(todoList);
};

const addNewTask = async (req, res) => {
  if (!req?.body?.task || !req?.body?.status || !req?.body?.deadline) {
    return res
      .status(400)
      .json({ message: "Task, status and deadline are required" });
  }

  try {
    const result = await ToDoLIst.create({
      task: req.body.task,
      status: req.body.status,
      deadline: req.body.deadline,
    });
    res.status(201).json(result);
    // const newTodo = new ToDoList({ task, status, deadline });
    // const savedTodo = await newTodo.save();
    // res.status(201).json(savedTodo);
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (req, res, next) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID required" });
  }
  const todo = await ToDoLIst.findOne({ _id: req.params.id });
  if (!todo) {
    return res
      .status(204)
      .json({ message: `No todo matches ${req.params.id}` });
  }
  if (req.body?.task) todo.task = req.body.task;
  if (req.body?.status) todo.status = req.body.status;
  if (req.body?.deadline) todo.deadline = req.body.deadline;
  const result = await todo.save();
  res.json(result);
};

const deleteTodo = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Todo ID required" });
  const todo = await ToDoLIst.findOne({ _id: req.params.id });
  if (!todo) {
    return res
      .status(204)
      .json({ message: `No todo matches ID ${req.params.id}` });
  }
  const result = await todo.deleteOne({ _id: req.params.id });
  res.json(result);
};

const getTodo = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee ID required" });

  const todo = await ToDoLIst.findOne({ _id: req.params.id }).exec();
  if (!todo) {
    return res
      .status(204)
      .json({ message: `No todo matches ID ${req.params.id}` });
  }
  res.json(todo);
};

module.exports = {
  getToDoList,
  addNewTask,
  updateTodo,
  deleteTodo,
  getTodo,
};
