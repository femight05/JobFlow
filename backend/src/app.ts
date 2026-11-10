import "dotenv/config";
import express from "express";
import connectDB from "./config/connect.ts";
import applicationRouter from "./routes/ApplicationRoute.ts";

const app = express();
app.use(express.json());

app.use("/api/applications", applicationRouter);

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
