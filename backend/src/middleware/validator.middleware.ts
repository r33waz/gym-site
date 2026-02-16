import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const dtoValidator = (type: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(type, req.body);

    const errors: ValidationError[] = await validate(dtoObject, {
      whitelist: true, // remove properties not in the DTO
      forbidNonWhitelisted: true, // throw error if extra properties exist
      skipMissingProperties: false, // all required fields must exist
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));
      return res.status(400).json({ errors: formattedErrors });
    }

    // Replace body with validated & transformed object
    req.body = dtoObject;
    next();
  };
};
