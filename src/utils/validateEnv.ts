import { cleanEnv, str } from 'envalid';

const validateEnv = (): void => {
  cleanEnv(process.env, {
    MONGO_ID: str(),
    MONGO_PWD: str(),
    MONGO_IP: str(),
    MONGO_DB: str(),
  });
};

export default validateEnv;
