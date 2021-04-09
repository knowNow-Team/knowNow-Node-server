import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { normalize } from 'path';
import Routes from './routes';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import DBConnection from './configs/dbConnection';

class Application {
  public app: express.Application;

  constructor() {
    this.app = express();
    validateEnv();
    this.settings();
    this.middlewares();
    this.routes();
    (() => new DBConnection())();
  }

  private settings(): void {
    this.app.set('port', normalize(process.env.PORT || '3000'));
  }

  private middlewares(): void {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(process.env.NODE_ENV === 'production' ? logger('combined') : logger('dev'));
  }

  private routes(): void {
    this.app.use(new Routes().router);
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(
        `!!!App is running at http://localhost:${process.env.PORT || '3000'} in ${process.env.NODE_ENV} mode!!!`,
      );
    });
  }
}

export default Application;
