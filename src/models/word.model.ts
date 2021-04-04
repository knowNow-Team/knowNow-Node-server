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

export interface Id extends Document {
  id: string;
}

export interface Meaning extends Document {
  meaning: [String];
}

export interface PronounceVoicePath extends Document {
  pronounceVoicePath: string;
}

export interface IWord extends Document {
  id: Id;
  wordClass: WordClass;
  meaning: Meaning;
  pronounceVoicePath: PronounceVoicePath;
}

const WordSchema: Schema = new Schema({
  id: {
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
  pronounceVoicePath: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<IWord>('Word', WordSchema);
