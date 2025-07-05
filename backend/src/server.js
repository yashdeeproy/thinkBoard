import express from "express";
import notesRouter from "./routes/notesRoutes.js"; 
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import loggerMiddleware from "./middleware/loggerMiddleware.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(loggerMiddleware);
app.use(cors());
app.use(rateLimiter);
app.use("/api/notes", notesRouter);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});