import { Response } from "express";
import { Request } from "models/request";

export type ResolverResponseUnion<T> =
  | boolean
  | number
  | string
  | null
  | Error
  | ResolverResponse<T>;
export type ResolverFunction<T> = (
  request: Request,
  response: Response,
) => Promise<ResolverResponseUnion<T>>;
export type ExpressResolver = (
  request: Request,
  response: Response,
) => Promise<void>;
export interface ResolverResponse<T> {
  status?: number;
  success: boolean;
  data: T;
}

export function routeResolver<T>(
  resolver: ResolverFunction<T>,
): ExpressResolver {
  return async (request: Request, response: Response) => {
    const res = await resolver(request, response);
    if (res instanceof Error) {
      request.logger.error(res);
      response.statusCode = 500;
      response.json({
        success: false,
      });
      return;
    }
    const singularDataTypes = ["boolean", "number", "string", "null"];
    if (singularDataTypes.includes(typeof res)) {
      response.json({
        success: true,
        data: res,
      });
      return;
    }
    const resInterface = res as ResolverResponse<T>;
    response.statusCode =
      resInterface.status ?? (resInterface.success ? 200 : 400);
    response.json({
      success: resInterface.success,
      data: resInterface.data,
    });
  };
}
