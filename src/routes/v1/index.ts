// /v1 라우팅
import express, { Router } from 'express';
import wordRouter from './words.route';

const apiV1Router: Router = express.Router();

apiV1Router.use('/words', wordRouter);

export default apiV1Router;
