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
    this.router.get(`${this.path}`, this.wordBookController.getWordbooks);
    this.router.get(`${this.path}/:wordbookId`, this.wordBookController.getWordbookById);
    this.router.put(`${this.path}/:wordbookId`, this.wordBookController.updateWordbook);
    this.router.delete(`${this.path}/:wordbookId`, this.wordBookController.deleteWordbook);
    this.router.post(`${this.path}`, this.wordBookController.addWordBook);
  }
}

export default WordBookRoute;
