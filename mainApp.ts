import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import { STATUSCODES, notifierError } from "./error/notifierError";
import { ulterError } from "./error/ulterError";
import authRoute from "./router/authRouter"
import router from "./router/taskRouter";

export const mainApp = (app: Application) => {
  app.use(express.json()).use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(STATUSCODES.OK).json({
        message: "You wanna consume my api",
      });
    } catch (error: any) {
      return res.status(STATUSCODES.BAD).json({
        message: error.message,
      });
    }
  });
  app.use("/api", router)

  app.all(
    "*",
    (error: notifierError, req: Request, res: Response, next: NextFunction) => {
      next(
        new notifierError({
          errorName: "Endpoint Error",
          errorMessage: `This endpoint error occurred as a result of ${req.originalUrl} URL request is wrong`,
          errorStatus: STATUSCODES.BAD,
          errorSuccess: false,
        })
      );
    }
  );

  app.use(ulterError);
  app.use("/api/v1", authRoute)
};
