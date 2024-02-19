import express from "express";
const router = express.Router();
import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoControllers";

router.get("/todos", getAllTodos);
router.post("/todos", addTodo);
router.patch("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

export default router;
