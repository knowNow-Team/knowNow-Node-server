import { model, Schema, Document, Model } from 'mongoose';
import { ITest, ETestStatus } from '../interfaces/tests.interface';

export default class TestModel {
  private model: Model<ITest & Document>;

  constructor() {
    const TestSchema: Schema = new Schema(
      {
        testerId: { type: Number, required: true },
        difficulty: { type: String, required: true },
        status: { type: [String], required: true, enum: Object.values(ETestStatus) },
        score: { type: String, required: true },
        wordTotalCount: { type: Number, required: true },
        correctAnswerCount: { type: Number, required: true },
        wordbooks: { type: [String], required: true },
        words: [
          {
            wordId: {
              // type: Schema.Types.ObjectId,
              type: String,
              required: true,
              // ref: 'Words',
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
      },
      {
        timestamps: true,
      },
    );
    this.model = model<ITest & Document>('Tests', TestSchema);
  }

  public getModel(): Model<ITest & Document> {
    return this.model;
  }
}
