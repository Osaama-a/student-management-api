import type { Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";
import { ZodError, type ZodType } from "zod";
import { ApiError } from "../utils/ApiError.js";
import { MESSAGES } from "../constants/message.js";

interface RequestValidationShape {
  body?: Record<string, unknown>;
  query?: ParsedQs;
  params?: ParamsDictionary;
}

export function validate(schema: ZodType) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as RequestValidationShape;

      if (parsed.body) req.body = parsed.body;
      if (parsed.query) req.query = parsed.query;
      if (parsed.params) req.params = parsed.params;

      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(
          ApiError.badRequest());
      }
      return next(err);
    }
  };
}