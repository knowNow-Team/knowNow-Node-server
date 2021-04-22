import { IsNumber, IsString } from 'class-validator';
import { EFilter } from '../interfaces/wordBooks.interface';

export class WordBookDto {
  @IsString()
  public title!: string;

  @IsNumber()
  public owner!: number;
}

export class WordBookListDto {
  @IsString()
  public wordId!: string;

  @IsString()
  public filter!: EFilter;
}
