import { Router } from 'express';
import IRoute from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import WordController from '@controllers/v1/words.controller';
import { WordDto } from '@dtos/words.dto';

class WordRoute implements IRoute {
  public path = '/v1/words';
  public router = Router();
  public wordsController = new WordController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:wordId`, this.wordsController.getWordById);
    this.router.post(`${this.path}`, validationMiddleware(WordDto, 'body', true), this.wordsController.createWord);
    this.router.put(`${this.path}/:wordId`, this.wordsController.updateWord);
  }
}
export default WordRoute;
