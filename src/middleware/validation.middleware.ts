import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const err = result.error as ZodError;
      return res.status(400).json({
        success: false,
        message: "Error validation",
        errors: (result.error as any).errors,
      });
    }

    req.body = result.data;
    next();
  };
