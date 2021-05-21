import { Types } from 'mongoose';
import { WordbookDto } from '../../dtos/wordbooks.dto';
import HttpException from '../../exceptions/HttpException';
import { EFilter, IMatchOption, IWordbook, IWordbookWithCount } from '../../interfaces/wordbooks.interface';
import WordbookModel from '../../models/wordbooks.model';
import { resMessage, statusCode } from '../../utils';
import Mongoose from 'mongoose';

const ObjectId = Mongoose.Types.ObjectId;
const WORDBOOK = '단어장';
const WORD = '단어';

class WordbookService {
  public WordbookModel = new WordbookModel().getModel();

  public async findAllWordbookWithWordCount(
    userId: number,
    wordbookIds: string[] = [''],
  ): Promise<IWordbookWithCount[]> {
    const matchOption: IMatchOption = { owner: userId };
    if (wordbookIds[0]) {
      matchOption._id = { $in: wordbookIds.map((item) => Types.ObjectId(item)) };
    }

    const wordbookInfoWithWordCounts = await this.WordbookModel.aggregate()
      .match(matchOption)
      .project({
        words: { $filter: { input: '$words', as: 'word', cond: { $eq: ['$$word.isRemoved', false] } } },
        title: 1,
        owner: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .unwind({ path: '$words', preserveNullAndEmptyArrays: true })
      .group({
        _id: { id: '$_id', wordFilter: '$words.filter' },
        title: { $first: '$title' },
        owner: { $first: '$owner' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
        count: {
          $sum: {
            $cond: [{ $gt: ['$words.filter', null] }, 1, 0],
          },
        },
      })
      .group({
        _id: '$_id.id',
        title: { $first: '$title' },
        owner: { $first: '$owner' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
        filters: { $push: { filter: '$_id.wordFilter', count: '$count' } },
        allCount: { $sum: '$count' },
      });

    return wordbookInfoWithWordCounts;
  }

  public async findWordbookWordData(userId: number, wordbooksIdArr: string[]): Promise<IWordbook[]> {
    const wordbooksIdArrData = wordbooksIdArr.map((e) => {
      return ObjectId(e);
    });
    const wordbooksData = await this.WordbookModel.aggregate([
      {
        $match: {
          owner: userId,
          _id: { $in: wordbooksIdArrData },
        },
      },
      {
        $project: {
          title: 1,
          owner: 1,
          createdAt: 1,
          updatedAt: 1,
          words: 1,
        },
      },
      {
        $unwind: { path: '$words', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'words',
          localField: 'words.wordId',
          foreignField: '_id',
          as: 'words-doc',
        },
      },
    ]);

    return wordbooksData;
  }

  public async findOptionWordbookData(
    userId: number,
    order: string,
    filterArr: EFilter[],
    wordbooksIdArr: string[],
  ): Promise<IWordbook[]> {
    const wordbooksIdArrData = wordbooksIdArr.map((e) => {
      return ObjectId(e);
    });
    const optionWordbooksData = await this.WordbookModel.aggregate([
      {
        $match: {
          owner: userId,
          _id: { $in: wordbooksIdArrData },
        },
      },
      {
        $project: {
          words: {
            $filter: {
              input: '$words',
              as: 'word',
              cond: { $and: [{ $eq: ['$$word.isRemoved', false] }, { $in: ['$$word.filter', filterArr] }] },
            },
          },
          title: 1,
          owner: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $unwind: { path: '$words', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'words',
          localField: 'words.wordId',
          foreignField: '_id',
          as: 'words-doc',
        },
      },
    ]);

    return optionWordbooksData;
  }

  public async findTrashWordbooksData(userId: number): Promise<IWordbook[]> {
    const getTrashWordbooks = await this.WordbookModel.aggregate([
      {
        $unwind: '$words',
      },
      {
        $match: { 'words.isRemoved': true, 'owner': userId },
      },
      {
        $project: {
          _id: 0,
          words: 1,
        },
      },
      {
        $lookup: {
          from: 'words',
          localField: 'words.wordId',
          foreignField: '_id',
          as: 'doc',
        },
      },
      {
        $unwind: '$doc',
      },
    ]);

    if (!getTrashWordbooks) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORD));

    return getTrashWordbooks;
  }

  public async createWordsInWordbook(wordbookId: string, userId: number, wordIds: string[]) {
    let wordbookData = await this.WordbookModel.findOne({ _id: wordbookId, owner: userId });
    if (!wordbookData) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));

    wordIds.forEach((wordId) => {
      wordbookData?.words.push({ wordId });
    });

    await wordbookData.save();
    wordbookData = await this.WordbookModel.populate(wordbookData, 'words.wordId');

    return wordbookData;
  }

  public async createWordbook(wordbookData: WordbookDto): Promise<IWordbook> {
    const wordbooks: IWordbook = await this.WordbookModel.create({ ...wordbookData });
    return wordbooks;
  }

  public async updateWordbook(wordbookId: string, userId: number, title: string): Promise<IWordbook> {
    const updateWordbookById = await this.WordbookModel.findOneAndUpdate(
      { _id: wordbookId, owner: userId },
      { title: title },
      { new: true },
    );
    if (!updateWordbookById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));

    return updateWordbookById;
  }

  public async updateFilter(wordId: string, userId: number, filter: EFilter, wordbookId: string): Promise<IWordbook> {
    const updateFilterById = await this.WordbookModel.findOneAndUpdate(
      {
        owner: userId,
        _id: wordbookId,
        words: { $elemMatch: { wordId: wordId } },
      },
      {
        $set: { 'words.$.filter': filter },
      },
      { new: true },
    );
    if (!updateFilterById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORD));

    return updateFilterById;
  }

  public async restoreWord(wordId: string, userId: number): Promise<IWordbook> {
    const restoreWordById = await this.WordbookModel.findOneAndUpdate(
      {
        owner: userId,
        words: { $elemMatch: { wordId: wordId, isRemoved: true } },
      },
      { $set: { 'words.$.isRemoved': false } },
      { new: true },
    );
    if (!restoreWordById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORD));

    return restoreWordById;
  }

  public async removeWordData(wordId: string, userId: number): Promise<IWordbook> {
    const removeWordById = await this.WordbookModel.findOneAndUpdate(
      {
        owner: userId,
        words: { $elemMatch: { wordId: wordId, isRemoved: true } },
      },
      {
        $pull: { words: { wordId: wordId, isRemoved: true } },
      },
    );
    if (!removeWordById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORD));

    return removeWordById;
  }

  public async deleteWordData(wordbookId: string, wordId: string, userId: number): Promise<IWordbook> {
    const deleteWordById = await this.WordbookModel.findOneAndUpdate(
      {
        _id: wordbookId,
        owner: userId,
        words: { $elemMatch: { wordId: wordId, isRemoved: false } },
      },
      { $set: { 'words.$.isRemoved': true } },
      { new: true },
    );
    if (!deleteWordById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORD));

    return deleteWordById;
  }

  public async deleteWordbookData(wordbookId: string, userId: number): Promise<IWordbook> {
    const deleteWordbookById = await this.WordbookModel.findOneAndDelete({ _id: wordbookId, owner: userId });
    if (!deleteWordbookById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(WORDBOOK));

    return deleteWordbookById;
  }
}

export default WordbookService;
