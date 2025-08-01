import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import z, { ZodError } from "zod";

export const bodyValidatorMiddleware =
  (schema: z.ZodObject<any, any>): RequestHandler =>
  (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => issue.message);
        res.status(StatusCodes.BAD_REQUEST).json({
          error: "invalid request body",
          details: errorMessages.join(", "),
        });
        return;
      }
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "unknown error occured while validating request body" });
    }
  };
