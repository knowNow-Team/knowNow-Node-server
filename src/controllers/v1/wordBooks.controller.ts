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
