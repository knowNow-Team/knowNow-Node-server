export interface IWord {
  word: string;
  meaning: string[];
  wordClass: EWordClass;
  filter: EFilter[];
  pronounceVoicePath: string;
}

export enum EWordClass {
  nouns = 'nouns', // 명사
  pronouns = 'pronouns', // 대명사
  verbs = 'verbs', // 동사
  adverbs = 'adverbs', // 부사
  adjective = 'adjective', // 형용사
  articles = 'articles', // 관사
  prepositions = 'prepositions', // 전치사
  conjunctions = 'conjunctions', // 접촉사
  interjections = 'interjections', // 감탄사
}

export enum EFilter {
  memorized = 'memorized', // 외웠어요
  confused = 'confused', // 헷갈려요
  doNotKnow = 'doNotKnow', // 몰라요
}
