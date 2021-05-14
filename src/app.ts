import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
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
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  private async connectToDatabases(): Promise<void> {
    new MongoDBConnection();
    // new MysqlDBConnection();
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
      this.app.use(cors({ origin: 'apis.word.mjuknownow.com', credentials: true }));
    } else if (this.env === 'development') {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(hpp({ checkQuery: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  public getServer() {
    return this.app;
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Knownow docs',
        },
      },
      apis: ['docs/swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
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
