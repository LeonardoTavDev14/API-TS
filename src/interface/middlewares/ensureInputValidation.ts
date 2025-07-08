import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

const ensureInputValidation = (
  schema: ObjectSchema,
  location: "body" | "params" | "query" = "body"
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const result = schema.validate(request[location], { abortEarly: false });

    if (result.error) {
      response.status(400).json({
        message: "Validation error: ",
        errors: result.error.details.map((err) => err.message),
      });
    }

    next();
  };
};

export { ensureInputValidation };
