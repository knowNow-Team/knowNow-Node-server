import express, { Router } from 'express';
import * as wordController from '../../controllers/v1/words.controller';

const wordRouter: Router = express.Router();

wordRouter.get('/:wordId', wordController.getIndividualWord);
wordRouter.get('/', wordController.getFilterWord);
wordRouter.delete('/:wordId', wordController.deleteWord);

export default wordRouter;
