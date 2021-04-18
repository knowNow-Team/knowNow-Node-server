import { Router } from 'express';
import IRoute from '../../interfaces/routes.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import WordBookController from '../../controllers/v1/wordBooks.controller';

class WordBookRoute implements IRoute {
  public path = '/v1/wordbooks';
  public router = Router();
  public wordBookController = new WordBookController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.wordBookController.getWordBooks);
    this.router.get(`${this.path}/:wordBookId`, this.wordBookController.getWordBookById);
    this.router.put(`${this.path}/:wordBookId`, this.wordBookController.updateWordBook);
    this.router.delete(`${this.path}/:wordBookId`, this.wordBookController.deleteWordBook);
  }
}

export default WordBookRoute;
