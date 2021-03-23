import express from 'express';
import router from './routes';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { normalize } from 'path';
import 'dotenv';
import morgan from 'morgan';
import connect from './configs/dbConnection';

class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set('port', normalize(process.env.PORT || '3000'));
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(process.env.NODE_ENV === 'production' ? logger('combined') : logger('dev'));
  }

  routes() {
    this.app.use(router);
  }

  start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`!!!App is running at http://localhost:${this.app.get('port')} in ${this.app.get('env')} mode!!!`);
    });
  }
}

export default Application;
