import express from "express";
import { Environment } from "models/env";
import * as Pino from "pino";
import "dotenv/config";
import { appendLoggerMiddleware } from "middlewares/append-context";
import { registerRoutes } from "routes";

async function start() {
  const logger = Pino.pino();
  const env = Environment.fromLocal();
  const app = express();
  app.use(appendLoggerMiddleware(logger));
  await registerRoutes(app);
  logger.info(`listening at port ${env.listenPort}...`);
  app.listen(env.listenPort);
}

start();
