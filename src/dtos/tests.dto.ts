import { IsArray, IsBoolean, IsEnum, IsNumber, IsString, Max, Min, ValidateNested } from 'class-validator';
import { ETestDifficulty, ETestStatus } from '../interfaces/tests.interface';

export class TestWordListDto {
  @IsString()
  public wordId!: string;

  @IsBoolean()
  public isCorrect!: boolean;

  @IsString()
  public answer!: string;
}

export class TestDto {
  @IsNumber()
  public testerId!: number;

  @IsEnum(ETestDifficulty, { each: true })
  public difficulty!: ETestDifficulty;

  @IsEnum(ETestStatus, { each: true })
  public status!: ETestStatus[];

  @IsArray()
  @ValidateNested({ each: true })
  public words!: TestWordListDto[];

  @IsArray()
  public wordbooks!: string[];

  @IsNumber()
  public wordTotalCount!: number;

  @IsNumber()
  @Min(0)
  public correctAnswerCount!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  public score!: number;
}
