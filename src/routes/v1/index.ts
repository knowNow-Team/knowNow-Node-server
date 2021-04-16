// /v1 라우팅
import express, { Router } from 'express';
import wordBookRouter from './wordBooks.route';
import wordRouter from './words.route';

const apiV1Router: Router = express.Router();

apiV1Router.use('/wordbooks', wordBookRouter);
apiV1Router.use('/words', wordRouter);

export default apiV1Router;
