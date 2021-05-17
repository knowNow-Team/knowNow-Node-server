import WordController from '@controllers/v1/words.controller';
import { WordDto } from '@dtos/words.dto';
import IRoute from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
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
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(WordDto, 'body', true),
      this.wordsController.createWord,
    );
    this.router.post(`${this.path}/scrap`, authMiddleware, this.wordsController.getWordsByName);
    this.router.put(`${this.path}/:wordId`, authMiddleware, this.wordsController.updateWord);
  }
}

export default WordRoute;
