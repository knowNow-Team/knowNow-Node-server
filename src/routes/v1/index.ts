// /api/v1 라우팅
import express, { Router } from 'express';
import wordBookRouter from './wordBooks.route';

const apiV1Router: Router = express.Router();

apiV1Router.use('/wordbooks', wordBookRouter);

export default apiV1Router;
