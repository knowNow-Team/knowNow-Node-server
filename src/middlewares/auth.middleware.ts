import statusCode from '@utils/statusCode';
import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken } from '../interfaces/auths.interface';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies.Authorization || req.header('Authorization') || null;

    if (!Authorization) {
      return next(new HttpException(statusCode.NOT_FOUND, 'Authentication token missing'));
    }

    const secret = process.env.JWT_SECRET;
    const verificationResponse = jwt.verify(Authorization, secret) as DataStoredInToken;
    const userId = verificationResponse.id;

    if (!userId) {
      return next(new HttpException(statusCode.UNAUTHORIZED, 'Wrong authentication token'));
    }

    req.userId = userId;
    next();
  } catch (error) {
    next(new HttpException(statusCode.UNAUTHORIZED, 'Wrong authentication token'));
  }
};

export default authMiddleware;
