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
    }
  }
  namespace Express {
    export interface Request {
      decoded?: DecodedInfo;
    }
  }
}

export {};
