import { model, Schema, Document, Model } from 'mongoose';
import { EFilter, IWordbook } from '../interfaces/wordbooks.interface';

export default class WordbookModel {
  private model: Model<IWordbook & Document>;

  constructor() {
    const WordbookSchema: Schema = new Schema(
      {
        title: { type: String, required: true },
        owner: { type: Number, required: true },
        words: [
          {
            _id: false,
            wordId: {
              type: Schema.Types.ObjectId,
              ref: 'Words',
            },
            filter: {
              type: String,
              enum: Object.values(EFilter),
              default: 'doNotKnow',
            },
            isRemoved: {
              type: Boolean,
              default: false,
            },
            addedAt: {
              type: Date,
              default: Date.now,
            },
          },
          {
            _id: false,
          },
        ],
        quantity: { type: Number, default: 0 },
      },
      {
        timestamps: true,
      },
    );
    this.model = model<IWordbook & Document>('Wordbooks', WordbookSchema);
  }

  public getModel(): Model<IWordbook & Document> {
    return this.model;
  }
}
