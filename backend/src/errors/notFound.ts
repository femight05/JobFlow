import type { Request, Response } from "express";

const notFoundMiddleware = async (req: Request, res: Response) => {
  res
    .status(404)
    .json({
      error: "Not Found",
      message: "The requested resource was not found.",
    });
};

export default notFoundMiddleware;
