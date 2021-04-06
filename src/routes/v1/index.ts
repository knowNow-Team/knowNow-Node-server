// /v1 라우팅
import express, { Router } from 'express';
import TestRouter from './tests.route';

class V1Routes {
  public router: Router = Router();

  constructor() {
    this.router.use('/tests', new TestRouter().router);
  }
}

export default V1Routes;
