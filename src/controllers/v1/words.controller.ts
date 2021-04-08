import { Request, Response } from 'express';
import * as wordService from '../../services/v1/words.service';
import { Word, WordClass, PronounceVoicePath, Meaning, Filter } from '../../models/words.model';

export async function addWord(req: Request, res: Response) {
  try {
    const body = req.body;
    const word: Word = body.word;
    const meaning: Meaning = body.meaning;
    const wordClass: WordClass = body.wordClass;
    const filter: Filter = body.filter;
    const pronounceVoicePath: PronounceVoicePath = body.pronounceVoicePath;
    const words = await wordService.addWord(word, meaning, wordClass, filter, pronounceVoicePath);
    res.status(200).json({ data: words });
  } catch (err) {
    res.status(500).json(`Error while add word (${err.message})`);
  }
}

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
