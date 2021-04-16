import { IsNumber, IsString } from 'class-validator';

export class WordBookDto {
  @IsString()
  public title!: string;

  @IsNumber()
  public owner!: number;
}

export class WordBookListDto {
  @IsString()
  public wordId!: string;
}
