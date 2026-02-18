import { NextFunction, Request, Response } from "express";

export const TryCatch =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => {
      // Check if error has a status/message (our structured error)
      if (err.status && err.message) {
        return res.status(err.status).json({
          success: false,
          message: err.message,
        });
      }

      // fallback for unexpected errors
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    });
  };
