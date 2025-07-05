import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import loggerMiddleware from "./middleware/loggerMiddleware.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();
dotenv.config();
console.log(process.env.NODE_ENV);
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(loggerMiddleware);
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}
app.use(rateLimiter);
app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production") {
  // Define the static path
  const staticPath = path.join(__dirname, "../frontend", "dist");

  // Serve static files
  app.use(express.static(staticPath));

  // Handle SPA routing with middleware approach instead of wildcard
  app.use((req, res, next) => {
    // Skip API routes
    if (req.path.startsWith("*")) {
      return next();
    }

    // Serve the index.html for all other routes
    res.sendFile(path.join(staticPath, "index.html"));
  });
}
await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
