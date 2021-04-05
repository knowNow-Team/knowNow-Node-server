import mongoose, { Schema, Document } from 'mongoose';

export enum WordClass {
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

export enum Filter {
  memorized = 'memorized', // 외웠어요
  confused = 'confused', // 헷갈려요
  doNotKnow = 'doNotKnow', // 몰라요
}

export interface Word extends Document {
  word: string;
}

export interface Meaning extends Document {
  meaning: [string];
}

export interface PronounceVoicePath extends Document {
  pronounceVoicePath: string;
}

export interface IWord extends Document {
  word: Word;
  wordClass: WordClass;
  meaning: Meaning;
  pronounceVoicePath: PronounceVoicePath;
}

const WordSchema: Schema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  meaning: {
    type: [String],
    required: true,
  },
  wordClass: {
    type: String,
    required: true,
    enum: Object.values(WordClass),
  },

  filter: {
    type: [String],
    enum: Object.values(Filter),
  },
  pronounceVoicePath: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<IWord>('Words', WordSchema);
