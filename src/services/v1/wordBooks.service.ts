import WordBooks, { Title, Owner, IWordBook } from '../../models/wordBooks.model';

export async function addWordBook(title: Title, owner: Owner) {
  const wordBook: IWordBook = new WordBooks();
  wordBook.title = title;
  wordBook.owner = owner;
  await wordBook.save();
  const wordBooks = await WordBooks.find({}).select('-words -__v');
  return wordBooks;
}

export async function getWordBooks() {
  const wordBooks = await WordBooks.find({}).select('-words -__v');
  return wordBooks;
}

export async function deleteWordBook(wordBookId: string) {
  const wordBook = await WordBooks.findOne({ _id: wordBookId }).select('-words -__v');
  await WordBooks.deleteOne({ _id: wordBookId });
  return wordBook;
}

export async function updateWordBook(wordBookId: string, title: Title) {
  await WordBooks.updateOne({ _id: wordBookId }, { title: title });
  const wordBook = await WordBooks.findOne({ _id: wordBookId }).select('-words -__v');
  return wordBook;
}

export async function getIndividualWordBook(wordBookId: string) {
  const wordBook = await WordBooks.findOne({ _id: wordBookId }).select('-__v');
  return wordBook;
}
