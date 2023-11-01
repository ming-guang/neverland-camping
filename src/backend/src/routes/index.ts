import { Express } from "express";
import { registerHealthcheckRoute } from "routes/healthcheck";

export async function registerRoutes(app: Express) {
  await registerHealthcheckRoute(app);
}
