import { NextFunction, Request, Response } from 'express';
import { resMessage, statusCode, util } from '../../utils';
import HttpException from '../../exceptions/HttpException';
import { WordDto } from '../../dtos/words.dto';
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

  public updateWord = async (req: Request, res: Response, next: NextFunction) => {
    const wordId: string = req.params.wordId;
    const wordData: IWord = req.body; // 추후 토큰으로 받으면 유효성 검사해서 업데이트 할 것
    try {
      if (util.isEmpty(wordData)) throw new HttpException(statusCode.BAD_REQUEST, resMessage.NULL_VALUE);
      const updateWordData: IWord = await this.WordService.updateWord(wordId, wordData);
      return res.status(statusCode.OK).json({ message: resMessage.X_UPDATE_SUCCESS(WORD), data: updateWordData });
    } catch (err) {
      next(err);
    }
  };

  public deleteWord = async (req: Request, res: Response, next: NextFunction) => {
    const wordId: string = req.params.wordId;
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.

    try {
      const updateWordById = await this.WordService.deleteWordData(wordId);
      return res.status(statusCode.OK).json({ message: resMessage.X_DELETE_SUCCESS(WORD), data: updateWordById });
    } catch (err) {
      next(err);
    }
  };
}

export default WordController;
