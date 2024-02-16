import { Request, Response } from "express";
import { db } from "../db/index";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await db.query.todos.findMany();
    res.json(todos.reverse());
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;

    const newTodo = await db.insert(todos).values({ task }).returning();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  console.log(req.body.task);
  try {
    const { id } = req.params;
    const todo_id = parseInt(id);
    const { task } = req.body;
    let updatedTodo;
    if (task) {
      updatedTodo = await db
        .update(todos)
        .set({ task: task })
        .where(eq(todos.id, todo_id))
        .returning();
    } else {
      updatedTodo = await db
        .update(todos)
        .set({ isCompleted: true })
        .where(eq(todos.id, todo_id))
        .returning();
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo_id = parseInt(id);
    console.log("delete kro", todo_id);
    await db.delete(todos).where(eq(todos.id, todo_id));
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
