import express, { Router, Request, Response } from 'express';

export default class TestRoute {
  public router: Router;

  constructor() {
    this.router = express();
    this.router.get('/', (req: Request, res: Response) => {
      res.send('Hello world');
    });
  }
}
