import express from "express";
import cors from "cors";

import applicationRouter from "./routes/ApplicationRoute.ts";
import userRouter from "./routes/userRoutes.ts";
import authMiddleware from "./middleware/auth.ts";
import notFoundMiddleware from "./errors/notFound.ts";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/applications", authMiddleware, applicationRouter);
app.use(notFoundMiddleware);

export default app;
