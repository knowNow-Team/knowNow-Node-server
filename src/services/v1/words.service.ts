import HttpException from '../../exceptions/HttpException';
import { resMessage, statusCode } from '../../utils';
import WordModel from '../../models/words.model';
import { IWord } from '../../interfaces/words.interface';

const WORD = '단어';

class WordService {
  public WordModel = new WordModel().getModel();

  public async findWordById(wordId: string): Promise<IWord> {
    const findWord = await this.WordModel.findOne({ _id: wordId });
    if (!findWord) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORD));

    return findWord;
  }

  public async updateWord(wordId: string, wordData: IWord): Promise<IWord> {
    const updateWordById = await this.WordModel.findByIdAndUpdate(wordId, { ...wordData });
    if (!updateWordById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORD));

    return updateWordById;
  }
}

export default WordService;
