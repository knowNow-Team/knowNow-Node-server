import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';
import { createValidationErrorMessage } from '../utils/util';

const validationMiddleware = (
  type: any,
  value: 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false, // 값이 다 들어가야하는 조건
): RequestHandler => {
  return async (req, res, next) => {
    const errors: ValidationError[] = await validate(plainToClass(type, req[value]), { skipMissingProperties });
    if (errors.length > 0) {
      const message = createValidationErrorMessage(errors);
      next(new HttpException(400, message));
    } else {
      next();
    }
  };
};

export default validationMiddleware;
