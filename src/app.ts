import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import cors from 'cors';
import { normalize } from 'path';
import Routes from './interfaces/routes.interface';
import MongoDBConnection from './configs/mongo.config';
import MysqlDBConnection from './configs/mysql.config';
import { logger, stream } from './utils/logger';
import errorMiddleware from './middlewares/error.middleware';

class Application {
  public app: express.Application;
  public env: string;

  constructor(route: Routes[]) {
    this.app = express();
    this.env = process.env.NODE_ENV;

    global._logger = logger;

    this.connectToDatabases();
    this.initializeSettings();
    this.initializeMiddlewares();
    this.initializeRoutes(route);
    this.initializeErrorHandling();
  }

  private async connectToDatabases(): Promise<void> {
    new MongoDBConnection();
    new MysqlDBConnection();
  }

  private initializeSettings(): void {
    this.app.set('port', normalize(process.env.PORT || '3000'));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeMiddlewares(): void {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else if (this.env === 'development') {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(hpp());
    this.app.use(helmet());
  }

  public getServer() {
    return this.app;
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      logger.info(
        `!!!App is running at http://localhost:${process.env.PORT || '3000'} in ${process.env.NODE_ENV} mode!!!`,
      );
    });
  }
}

export default Application;
