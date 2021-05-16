import { Router } from 'express';
import IRoute from '../../interfaces/routes.interface';
import WordbookController from '../../controllers/v1/wordbooks.controller';
import authMiddleware from '../../middlewares/auth.middleware';

class WordbookRoute implements IRoute {
  public path = '/v1/wordbooks';
  public router = Router();
  public wordbookController = new WordbookController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.wordbookController.getWordbooks);
    this.router.get(`${this.path}/words`, authMiddleware, this.wordbookController.getWordbookWords);
    this.router.get(`${this.path}/trashwordbooks`, authMiddleware, this.wordbookController.getTrashWordbooks);
    this.router.get(`${this.path}/:wordbookId`, authMiddleware, this.wordbookController.getWordbookById);
    this.router.post(`${this.path}`, authMiddleware, this.wordbookController.createWordbook);
    this.router.put(`${this.path}/trashwordbooks/:wordId`, authMiddleware, this.wordbookController.restoreWord);
    this.router.put(`${this.path}/:wordbookId`, authMiddleware, this.wordbookController.updateWordbook);
    this.router.put(`${this.path}/:wordbookId/words`, authMiddleware, this.wordbookController.createWordsInWordbook);
    this.router.put(`${this.path}/:wordbookId/:wordId`, authMiddleware, this.wordbookController.updateFilter);
    this.router.delete(`${this.path}/:wordbookId`, authMiddleware, this.wordbookController.deleteWordbook);
    this.router.delete(
      `${this.path}/:wordbookId/words/:wordId`,
      authMiddleware,
      this.wordbookController.deleteWordFromWordbook,
    );
    this.router.delete(
      `${this.path}/trashwordbooks/:wordId`,
      authMiddleware,
      this.wordbookController.removeWordFromTrash,
    );
  }
}

export default WordbookRoute;
