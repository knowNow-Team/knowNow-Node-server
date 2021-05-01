import { NextFunction, Request, Response } from 'express';
import { resMessage, statusCode, util } from '../../utils';
import HttpException from '../../exceptions/HttpException';
import { IWord } from '../../interfaces/words.interface';
import WordService from '../../services/v1/words.service';

const WORD = '단어';

class WordController {
  public WordService = new WordService();

  public getWordById = async (req: Request, res: Response, next: NextFunction) => {
    const wordId: string = req.params.wordId;

    try {
      const findOneWordData: IWord = await this.WordService.findWordById(wordId);
      return res.status(statusCode.OK).json({ message: resMessage.X_READ_SUCCESS(WORD), data: findOneWordData });
    } catch (err) {
      next(err);
    }
  };

  public createWord = async (req: Request, res: Response, next: NextFunction) => {
    const wordInfo: WordDto = req.body;

    try {
      if (util.isEmpty(wordInfo)) throw new HttpException(statusCode.BAD_REQUEST, resMessage.NULL_VALUE);

      const createdWordData: IWord = await this.WordService.createWord(wordInfo);

      return res.status(statusCode.CREATED).json({ message: resMessage.X_CREATE_SUCCESS, data: createdWordData });
    } catch (err) {
      next(err);
    }
  };
}

export default WordController;
