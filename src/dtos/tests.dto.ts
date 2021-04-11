import { IsArray, IsBoolean, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ETestStatus } from '../interfaces/tests.interface';

export class TestWordListDto {
  @IsString()
  public wordId!: string;

  @IsBoolean()
  public isCorrect!: boolean;

  @IsString()
  public answer!: string;
}

export class TestDto {
  @IsString()
  public testerId!: string;

  @IsString()
  public difficulty!: string;

  @IsEnum(ETestStatus, { each: true })
  public status!: ETestStatus[];

  @IsArray()
  @ValidateNested({ each: true })
  public words!: TestWordListDto[];

  @IsArray()
  public wordbooks!: string[];

  @IsNumber()
  public score!: number;
}
