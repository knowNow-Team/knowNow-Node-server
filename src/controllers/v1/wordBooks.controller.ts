import { Request, Response } from 'express';
import * as wordBookService from '../../services/v1/wordBooks.service';
import { Title, Owner } from '../../models/wordBooks.model';

export async function addWordBook(req: Request, res: Response) {
  try {
    const body = req.body;
    const title: Title = body.title;
    const owner: Owner = body.owner;
    const wordBook = await wordBookService.addWordBook(title, owner);
    res.status(200).json({ data: wordBook });
  } catch (err) {
    res.status(500).json(`Error while add wordBook (${err.message})`);
  }
}

export async function getWordBook(req: Request, res: Response) {
  try {
    const wordBooks = await wordBookService.getWordBooks();
    res.status(200).json({ data: wordBooks });
  } catch (err) {
    res.status(500).json(`Error while get wordBook (${err.message})`);
  }
}

export async function deleteWordBook(req: Request, res: Response) {
  try {
    const wordBookId: string = req.params.wordbookId;
    const wordBook = await wordBookService.deleteWordBook(wordBookId);
    res.status(200).json({ data: wordBook });
  } catch (err) {
    res.status(500).json(`Error while delete wordBook (${err.message})`);
  }
}

export async function updateWordBook(req: Request, res: Response) {
  try {
    const wordBookId: string = req.params.wordbookId;
    const title: Title = req.body.title;
    const wordBook = await wordBookService.updateWordBook(wordBookId, title);
    res.status(200).json({ data: wordBook });
  } catch (err) {
    res.status(500).json(`Error while update wordBook (${err.message})`);
  }
}
