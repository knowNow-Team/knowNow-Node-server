import { IsNumber, IsString, IsBoolean } from 'class-validator';
import { EFilter } from '../interfaces/wordbooks.interface';

export class WordbookDto {
  @IsString()
  public title!: string;

  @IsNumber()
  public owner!: number;

  @IsNumber()
  quantity!: number;
}

export class WordbookListDto {
  @IsString()
  public wordId!: string;

  @IsString()
  public filter!: EFilter;

  @IsBoolean()
  public isRemoved!: boolean;
}
