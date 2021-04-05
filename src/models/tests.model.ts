import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Word extends Document {
  word: {
    wordId: string; // 영어단어 id
    isCorrect: boolean; // 정답 여부
    answer?: string; // 제출한 정답
  };
}

export interface Status extends Document {
  status: ['memorized' | 'confused' | 'doNotKnow'];
}

export interface TestInterface extends Document {
  testerId: string; // 시험친 유저
  difficulty: string; // 난이도
  status: Status; // 몰라요, 헷갈려요, 다외웠어요 타입
  words: [Word]; // 영어단어 리스트
  wordBooks: [string]; // 영어단어장 리스트
  score: number; // 점수
}

export class Tests {
  private model: Model<TestInterface>;

  constructor() {
    const TestSchema: Schema = new Schema(
      {
        testerId: { type: String, required: true },
        difficulty: { type: String, required: true },
        status: { type: String, required: true, enum: ['memorized', 'confused', 'doNotKnow'] },
        words: [
          {
            wordId: {
              type: String,
              required: true,
            },
            isCorrect: {
              type: Boolean,
              required: true,
            },
            answer: {
              type: String,
            },
          },
        ],
        wordBooks: { type: String, required: true },
        score: { type: String, required: true },
      },
      {
        timestamps: true,
      },
    );
    this.model = mongoose.model<TestInterface>('Tests', TestSchema);
  }

  public getModel(): Model<TestInterface> {
    return this.model;
  }
}
