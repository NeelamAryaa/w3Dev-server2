import "../dotenvSetup";
import { todos } from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {
  schema,
});

const main = async () => {
  try {
    await db.delete(todos);
    await db.insert(todos).values([
      {
        task: "task1",
      },
      {
        task: "task2",
      },
      {
        task: "task3",
      },
      {
        task: "task4",
      },
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
