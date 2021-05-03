import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import { WordbookDto } from '../../dtos/wordbooks.dto';
import { IWordbook } from '../../interfaces/wordbooks.interface';
import WordbookService from '../../services/v1/wordbooks.service';
import { resMessage, statusCode, util } from '../../utils';

const WORDBOOK = '단어장';
const WORD = '단어';

class WordbookController {
  public WordbookService = new WordbookService();

  public getWordbooks = async (req: Request, res: Response, next: NextFunction) => {
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    try {
      const findAllWordbooksData: IWordbook[] = await this.WordbookService.findAllWordbook(userId);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_READ_ALL_SUCCESS(WORDBOOK), data: findAllWordbooksData });
    } catch (err) {
      next(err);
    }
  };

  public getWordbookWords = async (req: Request, res: Response, next: NextFunction) => {
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    const wordbookIds: string = req.query.wordbookIds as string;
    const wordbooksIdArr: string[] = wordbookIds.split(',') as string[];
    try {
      const wordbooksData = await this.WordbookService.findWordbookWordData(userId, wordbooksIdArr);
      return res.status(statusCode.OK).json({ message: resMessage.X_READ_ALL_SUCCESS(WORDBOOK), data: wordbooksData });
    } catch (err) {
      next(err);
    }
  };

  public getWordbookById = async (req: Request, res: Response, next: NextFunction) => {
    const wordbookId: string = req.params.wordbookId;
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    try {
      const findOneWordbookData: IWordbook = await this.WordbookService.findWordbookById(wordbookId, userId);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_READ_SUCCESS(WORDBOOK), data: findOneWordbookData });
    } catch (err) {
      next(err);
    }
  };

  public createWordsInWordbook = async (req: Request, res: Response, next: NextFunction) => {
    const wordbookId: string = req.params.wordbookId;
    const { userId, wordIds }: { userId: number; wordIds: string[] } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    try {
      const wordbookData = await this.WordbookService.createWordsInWordbook(wordbookId, userId, wordIds);

      return res.status(statusCode.OK).json({ message: resMessage.X_UPDATE_SUCCESS(WORDBOOK), data: wordbookData });
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
    const wordbookData: IWordbook = req.body;
    try {
      if (util.isEmpty(wordbookData)) throw new HttpException(statusCode.BAD_REQUEST, resMessage.NULL_VALUE);

      const updateWordbookData: IWordbook = await this.WordbookService.updateWordbook(wordbookId, userId, wordbookData);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_UPDATE_SUCCESS(WORDBOOK), data: updateWordbookData });
    } catch (err) {
      next(err);
    }
  };

  public addWordbook = async (req: Request, res: Response, next: NextFunction) => {
    const wordbookData: WordbookDto = req.body;
    try {
      if (util.isEmpty(wordbookData)) throw new HttpException(statusCode.BAD_REQUEST, resMessage.NULL_VALUE);
      const data: IWordbook = await this.WordbookService.addWordbook(wordbookData);
      return res.status(statusCode.CREATED).json({ message: resMessage.X_CREATE_SUCCESS(WORDBOOK), data: data });
    } catch (err) {
      next(err);
    }
  };

  //단어장 삭제할 때 우선 휴지통 단어장으로 옮겨야 함(휴지통에서만 바로 삭제가 가능함)
  public deleteWordFromWordbook = async (req: Request, res: Response, next: NextFunction) => {
    const wordId: string = req.params.wordId;
    const wordbookId: string = req.params.wordbookId;
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.

    try {
      const updateWordById = await this.WordbookService.deleteWordData(wordbookId, wordId, userId);
      return res.status(statusCode.OK).json({ message: resMessage.X_DELETE_SUCCESS(WORD), data: updateWordById });
    } catch (err) {
      next(err);
    }
  };

  public getTrashWordbooks = async (req: Request, res: Response, next: NextFunction) => {
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    try {
      const getTrashWordbooks: IWordbook[] = await this.WordbookService.getTrashWordbooksData(userId);
      return res.status(statusCode.OK).json({ message: resMessage.X_READ_SUCCESS(WORDBOOK), data: getTrashWordbooks });
    } catch (err) {
      next(err);
    }
  };
}

export default WordbookController;
