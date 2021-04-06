import { Request, Response, Router } from 'express';
import V1Router from './v1';

class Routes {
  public router: Router = Router();

  constructor() {
    this.router.use('/v1', new V1Router().router);
    this.router.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Health Check' });
    });
  }
}

export default Routes;
