import { IsArray, IsEnum, IsString } from 'class-validator';
import { EWordClass } from '../interfaces/words.interface';

export class WordDto {
  @IsString()
  public word!: string;

  @IsArray()
  public meanings!: string[];

  @IsEnum(EWordClass, { each: true })
  public wordClasses!: EWordClass[];

  @IsString()
  public phonics!: string;

  @IsString()
  public pronounceVoicePath!: string;
}
