import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { EWordClass, EFilter } from '../interfaces/words.interface';

export class WordDto {
  @IsNumber()
  public userId!: number;

  @IsEnum(EWordClass, { each: true })
  public wordClass!: EWordClass;

  @IsEnum(EFilter, { each: true })
  public filter!: EFilter[];

  @IsString()
  public word!: string;

  @IsArray()
  public meaning!: string[];

  @IsString()
  public pronounceVoicePath!: string;
}
