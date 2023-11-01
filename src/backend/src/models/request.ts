import { Request as ExpressRequest } from "express";
import * as Pino from "pino";

export interface Request extends ExpressRequest {
  logger: Pino.Logger;
}
