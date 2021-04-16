import { model, Schema, Document, Model } from 'mongoose';
import { IWordBook } from '../interfaces/wordBooks.interface';

export default class WordBookModel {
  private model: Model<IWordBook & Document>;

  constructor() {
    const WordBookSchema: Schema = new Schema(
      {
        title: { type: String, required: true },
        owner: { type: Number, required: true },
        words: [
          {
            wordId: {
              // type: Schema.Types.ObjectId,
              type: String,
              // ref: 'Words',
            },
          },
        ],
      },
      {
        timestamps: true,
      },
    );
    this.model = model<IWordBook & Document>('WordBooks', WordBookSchema);
  }

  public getModel(): Model<IWordBook & Document> {
    return this.model;
  }
}
