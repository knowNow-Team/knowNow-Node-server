import HttpException from '../../exceptions/HttpException';
import { resMessage, statusCode } from '../../utils';
import { WordbookDto } from '../../dtos/wordbooks.dto';
import { EFilter, IWordbook } from '../../interfaces/wordbooks.interface';
import WordbookModel from '../../models/wordbooks.model';
import { WordDto } from '../../dtos/words.dto';

const WORDBOOK = '단어장';
const WORD = '단어';

class WordbookService {
  public WordbookModel = new WordbookModel().getModel();

  public async findAllWordbook(userId: number): Promise<IWordbook[]> {
    const wordbooks: IWordbook[] = await this.WordbookModel.find({ owner: userId });
    return wordbooks;
  }

  public async findWordbookById(wordbookId: string, userId: number): Promise<IWordbook> {
    const findWordbook = await this.WordbookModel.findOne({ _id: wordbookId, owner: userId }).populate('words');
    if (!findWordbook) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));
    return findWordbook;
  }

  public async deleteWordbookData(wordbookId: string, userId: number): Promise<IWordbook> {
    const deleteWordbookById = await this.WordbookModel.findOneAndDelete({ _id: wordbookId, owner: userId });
    if (!deleteWordbookById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));

    return deleteWordbookById;
  }

  public async updateWordbook(wordbookId: string, userId: number, wordbookData: IWordbook): Promise<IWordbook> {
    await this.WordbookModel.findOneAndUpdate({ _id: wordbookId, owner: userId }, { ...wordbookData });
    const updateWordbookById = await this.WordbookModel.findOne({ _id: wordbookId, owner: userId });
    if (!updateWordbookById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));

    return updateWordbookById;
  }

  public async addWordbook(wordbookData: WordbookDto): Promise<IWordbook> {
    const wordbooks: IWordbook = await this.WordbookModel.create({ ...wordbookData });
    return wordbooks;
  }

  public async deleteWordData(
    wordbookId: string,
    wordId: string,
    wordData: WordDto,
    userId: number,
  ): Promise<IWordbook> {
    const deleteWordById = await this.WordbookModel.findOneAndUpdate(
      {
        _id: wordbookId,
        owner: userId,
      },
      { words: { $pull: { wordId: wordId } } },
      { new: true },
    );
    if (!deleteWordById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORD));

    return deleteWordById;
  }
}

export default WordbookService;
