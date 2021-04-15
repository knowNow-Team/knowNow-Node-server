import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import { WordBookDto } from '../../dtos/wordBooks.dto';
import { IWordBook } from '../../interfaces/wordBooks.interface';
import WordBookService from '../../services/v1/wordBooks.service';
import { resMessage, statusCode, util } from '../../utils';

const WORDBOOK = '단어장';

class WordBookController {
  public WordBookService = new WordBookService();

  public getWordBooks = async (req: Request, res: Response, next: NextFunction) => {
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    try {
      const findAllWordBooksData: IWordBook[] = await this.WordBookService.findAllWordBook(userId);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_READ_ALL_SUCCESS(WORDBOOK), data: findAllWordBooksData });
    } catch (err) {
      next(err);
    }
  };

  public getWordBookById = async (req: Request, res: Response, next: NextFunction) => {
    const wordBookId: string = req.params.wordBookId;
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    try {
      const findOneWordBookData: IWordBook = await this.WordBookService.findWordBookById(wordBookId, userId);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_READ_SUCCESS(WORDBOOK), data: findOneWordBookData });
    } catch (err) {
      next(err);
    }
  };

  public deleteWordBook = async (req: Request, res: Response, next: NextFunction) => {
    const wordBookId: string = req.params.wordBookId;
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    try {
      const deleteWordBookData = await this.WordBookService.deleteWordBookData(wordBookId, userId);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_DELETE_SUCCESS(WORDBOOK), data: deleteWordBookData });
    } catch (err) {
      next(err);
    }
  };

  public updateWordBook = async (req: Request, res: Response, next: NextFunction) => {
    const wordBookId: string = req.params.wordBookId;
    const { userId }: { userId: number } = req.body; // 추후 토큰으로 받으면 유효성 검사해서 불러올 것.
    const wordBookData: IWordBook = req.body;
    try {
      if (util.isEmpty(wordBookData)) throw new HttpException(statusCode.BAD_REQUEST, resMessage.NULL_VALUE);

      const updateWordBookData: IWordBook = await this.WordBookService.updateWordBook(wordBookId, userId, wordBookData);
      return res
        .status(statusCode.OK)
        .json({ message: resMessage.X_UPDATE_SUCCESS(WORDBOOK), data: updateWordBookData });
    } catch (err) {
      next(err);
    }
  };
}

export default WordBookController;
