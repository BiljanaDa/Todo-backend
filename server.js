require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const credentials = require("./middleware/credentials");

const PORT = process.env.PORT || 3500;

connectDB();

app.use(credentials);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/getTodoList", require("./routes/api/todo"));
app.use("/addTodoList", require("./routes/api/todo"));
app.use("/updateTodoList", require("./routes/api/todo"));
app.use("/deleteTodoList", require("./routes/api/todo"));
app.use("/getTodoList/:id", require("./routes/api/todo"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
