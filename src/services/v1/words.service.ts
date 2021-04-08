import { Word, WordClass, Filter, PronounceVoicePath, Meaning, IWord } from '../../models/words.model';
import Words from '../../models/words.model';

export async function addWord(
  word: Word,
  meaning: Meaning,
  worldClass: WordClass,
  filter: Filter,
  pronounceVoicePath: PronounceVoicePath,
) {
  const words: IWord = new Words();
  words.word = word;
  words.meaning = meaning;
  words.wordClass = worldClass;
  words.filter = filter;
  words.pronounceVoicePath = pronounceVoicePath;
  await words.save();
  return words;
}

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
