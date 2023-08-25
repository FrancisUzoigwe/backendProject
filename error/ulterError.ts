import { Request, Response, NextFunction } from "express";
import { STATUSCODES, notifierError } from "./notifierError";

export const errorField = async (error: notifierError, res: Response) => {
  return res.status(STATUSCODES.BAD).json({
    errorName: error.errorName,
    errorMessage: error.errorMessage,
    errorStatus: error.errorStatus,
    errorSuccess: error.errorSuccess,
    errorStack: error.stack,
    error,
  });
};

export const ulterError = (
  error: notifierError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorField(error, res);
};
