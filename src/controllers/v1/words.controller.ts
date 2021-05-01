import { NextFunction, Request, Response } from 'express';
import { resMessage, statusCode, util } from '../../utils';
import HttpException from '../../exceptions/HttpException';
import { IWord } from '../../interfaces/words.interface';
import WordService from '../../services/v1/words.service';
import { WordDto } from '../../dtos/words.dto';

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

  public getWordsByName = async (req: Request, res: Response, next: NextFunction) => {
    const wordNames: string[] = req.body.wordNames;

    try {
      const wordInfos = await Promise.all(
        wordNames.map(async (wordName: string) => {
          const wordInfo = await this.WordService.findWordByName(wordName);
          if (wordInfo) {
            return wordInfo;
          }
          const scrappedWordInfo = await this.WordService.scrapWord(wordName);
          const createdWordInfo = await this.WordService.createWord(JSON.parse(scrappedWordInfo));

          return createdWordInfo;
        }),
      );

      return res.status(statusCode.OK).json({ message: resMessage.X_READ_ALL_SUCCESS(WORD), data: wordInfos });
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
}

export default WordController;
