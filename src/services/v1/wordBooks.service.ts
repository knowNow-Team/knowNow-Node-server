import WordBooks, { Title, Owner, IWordBook } from '../../models/wordBooks.model';

export async function addWordBook(title: Title, owner: Owner) {
  const wordBook: IWordBook = new WordBooks();
  wordBook.title = title;
  wordBook.owner = owner;
  await wordBook.save();
  const wordBooks = await WordBooks.find({}).select('-words -__v');
  return wordBooks;
}
