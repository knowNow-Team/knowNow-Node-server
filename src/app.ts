import express, { Application } from 'express';
import router from './routes';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { normalize } from 'path';
import 'dotenv';
import connect from './configs/dbConnection';

const app: Application = express();

// db connect
connect();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  process.env.NODE_ENV === 'production' ? logger('combined') : logger('dev'),
);
app.use(cookieParser());

// Express variables
app.set('port', normalize(process.env.PORT || '3000'));

// Routing
app.use(router);

// Start server
app.listen(app.get('port'), () => {
  console.log(
    `!!!App is running at http://localhost:${app.get('port')} in ${app.get(
      'env',
    )} mode!!!`,
  );
});
