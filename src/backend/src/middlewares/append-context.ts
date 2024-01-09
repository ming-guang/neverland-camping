import { RequestHandler, Response, NextFunction } from "express";
import { Request } from "models/request";
import * as Pino from "pino";

export function appendLoggerMiddleware(logger: Pino.Logger): RequestHandler {
  return (request: Request, _response: Response, next: NextFunction) => {
    request.logger = logger;
    next();
  };
}
