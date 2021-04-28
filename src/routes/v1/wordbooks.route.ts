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
    this.router.get(`${this.path}/trashwordbooks`, this.wordbookController.getTrashWordbooks);
    this.router.get(`${this.path}/:wordbookId`, this.wordbookController.getWordbookById);
    this.router.post(`${this.path}`, this.wordbookController.createWordbook);
    this.router.put(`${this.path}/trashwordbooks/:wordId`, this.wordbookController.restoreWord);
    this.router.put(`${this.path}/:wordbookId`, this.wordbookController.updateWordbook);
    this.router.put(`${this.path}/:wordbookId/words`, this.wordbookController.createWordsInWordbook);
    this.router.put(`${this.path}/:wordbookId/:wordId`, this.wordbookController.updateFilter);
    this.router.delete(`${this.path}/:wordbookId`, this.wordbookController.deleteWordbook);
    this.router.delete(`${this.path}/:wordbookId/words/:wordId`, this.wordbookController.deleteWordFromWordbook);
<<<<<<< HEAD
    this.router.delete(`${this.path}/trashwordbooks/:wordId`, this.wordbookController.removeWordFromTrash);
=======
    this.router.get(`${this.path}/:wordbookId/words`, this.wordbookController.getOptionWords);
>>>>>>> Etc: 필터링된 단어 추출 라우트
  }
}

export default WordbookRoute;
