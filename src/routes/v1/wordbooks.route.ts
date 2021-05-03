import { Router } from 'express';
import IRoute from '../../interfaces/routes.interface';
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
    this.router.get(`${this.path}/words`, this.wordbookController.getWordbookWords);
    this.router.get(`${this.path}/trashWordbooks`, this.wordbookController.getTrashWordbooks);
    this.router.get(`${this.path}/:wordbookId`, this.wordbookController.getWordbookById);
    this.router.post(`${this.path}`, this.wordbookController.addWordbook);
    this.router.put(`${this.path}/:wordbookId`, this.wordbookController.updateWordbook);
    this.router.put(`${this.path}/:wordbookId/words`, this.wordbookController.createWordsInWordbook);
    this.router.delete(`${this.path}/:wordbookId`, this.wordbookController.deleteWordbook);
    this.router.delete(`${this.path}/:wordbookId/words/:wordId`, this.wordbookController.deleteWordFromWordbook);
    // this.router.get(`${this.path}/:wordbookId/words`, this.wordbookController.getOptionWords);
  }
}

export default WordbookRoute;
