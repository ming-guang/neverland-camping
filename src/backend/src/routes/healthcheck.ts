import { Express } from "express";
import { routeResolver } from "models/response";

const route = "/healthcheck";

async function healthcheck() {
  return true;
}

export async function registerHealthcheckRoute(app: Express) {
  app.get(route, routeResolver(healthcheck));
}
