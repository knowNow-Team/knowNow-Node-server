import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import { WordBookDto } from '../../dtos/wordBooks.dto';
import { IWordBook } from '../../interfaces/wordBooks.interface';
import WordbookService from '../../services/v1/wordBooks.service';
import { resMessage, statusCode, util } from '../../utils';

const WORDBOOK = '단어장';

class WordbookController {
  public WordbookService = new WordbookService();

  public getWordbooks = async (req: Request, res: Response, next: NextFunction) => {
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    try {
      const findAllWordbooksData: IWordBook[] = await this.WordbookService.findAllWordbook(userId);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_READ_ALL_SUCCESS(WORDBOOK), data: findAllWordbooksData });
    } catch (err) {
      next(err);
    }
  };

  public getWordbookById = async (req: Request, res: Response, next: NextFunction) => {
    const wordbookId: string = req.params.wordbookId;
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    try {
      const findOneWordbookData: IWordBook = await this.WordbookService.findWordbookById(wordbookId, userId);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_READ_SUCCESS(WORDBOOK), data: findOneWordbookData });
    } catch (err) {
      next(err);
    }
  };

  public deleteWordbook = async (req: Request, res: Response, next: NextFunction) => {
    const wordbookId: string = req.params.wordbookId;
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    try {
      const deleteWordbookData = await this.WordbookService.deleteWordbookData(wordbookId, userId);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_DELETE_SUCCESS(WORDBOOK), data: deleteWordbookData });
    } catch (err) {
      next(err);
    }
  };

  public updateWordbook = async (req: Request, res: Response, next: NextFunction) => {
    const wordbookId: string = req.params.wordbookId;
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    const wordbookData: IWordBook = req.body;
    try {
      if (util.isEmpty(wordbookData)) throw new HttpException(statusCode.BAD_REQUEST, resMessage.NULL_VALUE);

      const updateWordbookData: IWordBook = await this.WordbookService.updateWordbook(wordbookId, userId, wordbookData);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_UPDATE_SUCCESS(WORDBOOK), data: updateWordbookData });
    } catch (err) {
      next(err);
    }
  };
}

export default WordbookController;
