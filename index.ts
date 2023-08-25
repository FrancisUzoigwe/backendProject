import express from "express";
import { mainApp } from "./mainApp";
import env from "dotenv";
import { dataBase } from "./config/dataBase";
env.config();

const app = express();
const port: number = parseInt(process.env.APPLICATION_PORT!);
const realPort = port;

mainApp(app);
const Server = app.listen(realPort, () => {
  console.log("Server is listening on port", realPort);
  dataBase();
});

process.on("uncaughtException", (err) => {
  console.log("");
  console.log("Server is shutting down due to uncaught exception", err);

  process.exit(1);
});

process.on("unhandledrejection", (err) => {
  console.log("");
  console.log("Server is shutting down due to unhandled rejection", err);

  Server.close(() => {
    process.exit(1);
  });
});
