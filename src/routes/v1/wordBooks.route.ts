import { Router } from 'express';
import IRoute from '../../interfaces/routes.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import WordbookController from '../../controllers/v1/wordbooks.controller';

class WordbookRoute implements IRoute {
  public path = '/v1/wordbooks';
  public router = Router();
  public wordbookController = new WordbookController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.wordbookController.getWordbooks);
    this.router.get(`${this.path}/:wordbookId`, this.wordbookController.getWordbookById);
    this.router.put(`${this.path}/:wordbookId`, this.wordbookController.updateWordbook);
    this.router.delete(`${this.path}/:wordbookId`, this.wordbookController.deleteWordbook);
    this.router.post(`${this.path}`, this.wordbookController.addWordbook);
    this.router.delete(`${this.path}:wordbookId/words/:wordId`);
  }
}

export default WordbookRoute;
