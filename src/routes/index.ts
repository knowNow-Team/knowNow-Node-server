import express, { Request, Response, Router } from 'express';
import apiV1Router from './v1';

const router: Router = express.Router();

router.use('/v1', apiV1Router);
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Health Check' });
});

export default router;
