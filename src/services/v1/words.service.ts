import { Word, WordClass, Filter, PronounceVoicePath, Meaning, IWord } from '../../models/words.model';
import Words from '../../models/words.model';

export async function getIndividualWord(wordId: string) {
  const individualWord = await Words.findOne({
    _id: wordId,
  });
  if (individualWord) {
    return individualWord;
  } else {
    throw Error('no word');
  }
}

export async function deleteWord(wordId: string) {
  const deleteWord = await Words.findOne({
    _id: wordId,
  });
  await Words.deleteOne({
    _id: wordId,
  });
  return deleteWord;
}

export async function getFilterWord(order: string, filter: any) {
  const filterWords = Words.find({ filter: filter });
  if (order === 'ASC') {
    await filterWords.sort({ word: 1 });
  } else if (order === 'DESC') {
    await filterWords.sort({ word: -1 });
  } else if (order === 'NEWEST') {
    await filterWords.sort({ createdAt: -1 });
  } else if (order === 'RANDOM') {
    const randomWords = await Words.aggregate([{ $sample: { size: Words.length } }, { $match: { filter: filter } }]);
    return randomWords;
  } else if (order === 'NEWEST') {
    await filterWords.sort({ createdAt: -1 });
  }
  return filterWords;
}
