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
    const wordName: string = req.body.wordName;
    try {
      // 먼저 단어를 크롤링 해옴
      // 결과가 있으면 크롤링 한 결과를 JSON.parse()로 변경
      // MongoDB에 저장
    } catch (err) {
      next(err);
    }
  };
}

export default WordController;
