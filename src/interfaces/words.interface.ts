export interface IWord {
  word: string;
  meanings: string[];
  wordClasses: EWordClass[];
  pronounceVoicePath: string;
  phonics: string;
}

export enum EWordClass {
  nouns = '명사',
  pronouns = '대명사',
  verbs = '동사',
  adverbs = '부사',
  adjective = '형용사',
  articles = '관사',
  prepositions = '전치사',
  conjunctions = '접속사',
  interjections = '감탄사',
}
