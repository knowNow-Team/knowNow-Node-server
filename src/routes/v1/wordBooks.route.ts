import express, { Router } from 'express';
import * as wordBookController from '../../controllers/v1/wordBooks.controller';

const wordBookRouter: Router = express.Router();

wordBookRouter.post('/', wordBookController.addWordBook);
wordBookRouter.get('/', wordBookController.getWordBook);
wordBookRouter.delete('/:wordbookId', wordBookController.deleteWordBook);

export default wordBookRouter;
