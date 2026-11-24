import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

type HttpError = Error & {
  status?: number;
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, unknown>;
};

const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (res.headersSent) {
    return _next(err);
  }

  let status = err.status ?? err.statusCode ?? 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof mongoose.Error.ValidationError) {
    status = 400;
  } else if (err instanceof mongoose.Error.CastError) {
    status = 400;
    message = "Invalid resource ID.";
  } else if (err.code === 11000) {
    status = 409;
    const field = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
    message = `${field} already exists.`;
  }

  if (status < 400 || status > 599) {
    status = 500;
  }

  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : message,
    message,
  });
};

export default errorHandler;
