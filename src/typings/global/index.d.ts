import winston from 'winston';

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      JWT_SECRET: string;
      // MONGO_DB
      MONGO_ID: string;
      MONGO_PWD: string;
      MONGO_IP: string;
      MONGO_DB: string;

      // MYSQL_DB
      MYSQL_HOST: string;
      MYSQL_USER: string;
      MYSQL_PWD: string;
      MYSQL_DB: string;
    }
    export interface Global {
      _logger: winston.Logger;
    }
  }
  // namespace Express {
  //   export interface Request {
  //     decoded?: DecodedInfo;
  //   }
  // }
}

export {};
