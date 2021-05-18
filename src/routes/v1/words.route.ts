import WordController from '@controllers/v1/words.controller';
import IRoute from '@interfaces/routes.interface';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class WordRoute implements IRoute {
  public path = '/v1/words';
  public router = Router();
  public wordsController = new WordController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:wordId`, authMiddleware, this.wordsController.getWordById);
    this.router.post(`${this.path}/scrap`, authMiddleware, this.wordsController.getWordsByName);
    this.router.put(`${this.path}/:wordId`, authMiddleware, this.wordsController.updateWord);
  }
}

export default WordRoute;
