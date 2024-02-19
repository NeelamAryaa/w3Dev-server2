import { Request, Response } from "express";
import { db } from "../db/index";
import { todos } from "../db/schema";
import { eq, desc } from "drizzle-orm";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    // const todos = await db.query.todos.findMany();
    const todo = await db.select().from(todos).orderBy(desc(todos.createdAt));
    if (todo.length === 0) {
      return res.json({ error: "No Data Found!" });
    }

    // if (todo.length === 0) {
    //   return res.status(204).json({ error: "Uh oh Nothing Here !" });
    // } else
    return res.json(todo);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const newTask = task.trim();
    if (newTask === "") {
      return res.json({ error: "Task should not be empty." });
    }

    const newTodo = await db
      .insert(todos)
      .values({ task: newTask })
      .returning();
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo_id = parseInt(id);
    const { task, isCompleted } = req.body;

    let updatedTodo;
    if (task) {
      updatedTodo = await db
        .update(todos)
        .set({ task: task, updatedAt: new Date() })
        .where(eq(todos.id, todo_id))
        .returning();
    }
    if (isCompleted) {
      updatedTodo = await db
        .update(todos)
        .set({ isCompleted, updatedAt: new Date() })
        .where(eq(todos.id, todo_id))
        .returning();
    }
    return res.json(updatedTodo);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo_id = parseInt(id);

    await db.delete(todos).where(eq(todos.id, todo_id));
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
