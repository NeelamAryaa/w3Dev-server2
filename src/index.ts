// src/index.ts
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";

const app = express();
const port = process.env.PORT || 5432;
app.use(express.json());
const corsOptions = {
  // origin: `http://localhost:3000`,
  origin: "https://w3dev-client.onrender.com",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use("", todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
