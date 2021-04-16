import { Request, Response } from 'express';
import * as wordService from '../../services/v1/words.service';
import { Word, WordClass, PronounceVoicePath, Meaning, Filter } from '../../models/words.model';

export async function getIndividualWord(req: Request, res: Response) {
  try {
    const wordId: string = req.params.wordId;
    if (wordId) {
      const individualWord = await wordService.getIndividualWord(wordId);
      res.status(200).json({ data: individualWord });
    } else {
      throw Error('no params');
    }
  } catch (err) {
    res.status(500).json(`Error while get word (${err.message})`);
  }
}

export async function deleteWord(req: Request, res: Response) {
  try {
    const wordId: string = req.params.wordId;
    if (wordId) {
      const deleteWord = await wordService.deleteWord(wordId);
      res.status(200).json({ data: deleteWord });
    } else {
      throw Error('no params');
    }
  } catch (err) {
    res.status(500).json(`Error while delete word (${err.message})`);
  }
}

export async function getFilterWord(req: Request, res: Response) {
  try {
    const query = req.query;
    // wordBookId는 추후 추가
    const order: string = String(query.order); // 정렬(ex. 오름차순)
    const filter: string = String(query.filter);
    if (order && filter) {
      const word = await wordService.getFilterWord(order, filter);
      res.status(200).json({ data: word });
    } else {
      throw Error('no query');
    }
  } catch (err) {
    res.status(500).json(`Error while get words (${err.message})`);
  }
}
