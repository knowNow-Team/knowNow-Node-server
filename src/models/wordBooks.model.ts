import mongoose, { Schema, Document } from 'mongoose';

export interface Title extends Document {
  title: string;
}

export interface Owner extends Document {
  owner: number;
}

export interface IWordBook extends Document {
  title: Title;
  owner: Owner;
}

const WordBookSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Words',
    },
  ],
  owner: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IWordBook>('WordBooks', WordBookSchema);
