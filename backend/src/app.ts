import "dotenv/config";
import express from "express";
import cors from "cors"
import connectDB from "./config/connect.ts";
import applicationRouter from "./routes/ApplicationRoute.ts";
import userRouter from "./routes/userRoutes.ts";
import authMiddleware from "./middleware/auth.ts";
import notFoundMiddleware from "./errors/notFound.ts";
const app = express();
app.use(cors())
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/applications", authMiddleware, applicationRouter);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI || "");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
