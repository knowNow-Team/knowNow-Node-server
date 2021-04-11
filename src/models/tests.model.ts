import { model, Schema, Document, Model } from 'mongoose';
import { ITest, ETestStatus } from '../interfaces/tests.interface';

interface TestDocument extends ITest, Document {}

export default class TestModel {
  private model: Model<TestDocument>;

  constructor() {
    const TestSchema: Schema = new Schema(
      {
        testerId: { type: String, required: true },
        difficulty: { type: String, required: true },
        status: { type: [String], required: true, enum: Object.values(ETestStatus) },
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
        wordbooks: { type: [String], required: true },
        score: { type: String, required: true },
      },
      {
        timestamps: true,
      },
    );
    this.model = model<TestDocument>('Tests', TestSchema);
  }

  public getModel(): Model<TestDocument> {
    return this.model;
  }
}
