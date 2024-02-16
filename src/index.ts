// src/index.ts
import express from "express";
import cors from "cors";

import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./controllers/todoControllers";

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.get("/todos", getAllTodos);
app.post("/todos", addTodo);

app.patch("/todo/:id", updateTodo);
app.delete("/todo/:id", deleteTodo);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
