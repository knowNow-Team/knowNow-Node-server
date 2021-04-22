import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { EWordClass, EFilter } from '../interfaces/words.interface';

export class WordDto {
  @IsEnum(EWordClass)
  public wordClass!: EWordClass;

  @IsEnum(EFilter)
  public filter!: EFilter;

  @IsString()
  public word!: string;

  @IsArray()
  public meaning!: string[];

  @IsString()
  public phonics!: string;

  // @IsString()
  // public pronounceVoicePath!: string;
}
