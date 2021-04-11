import { IsArray, IsBoolean, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

export enum ETestStatus {
  memorized = 'memorized', // 외웠어요
  confused = 'confused', // 헷갈려요
  doNotKnow = 'doNotKnow', // 몰라요
}

export class TestWordListDto {
  @IsString()
  public wordId!: string;

  @IsBoolean()
  public isCorrect!: boolean;

  @IsString()
  public answer!: string;
}

export class TestStatusDto {
  @IsEnum(Object.keys(ETestStatus))
  public status!: string;
}

export class TestDto {
  @IsString()
  public testerId!: string;

  @IsString()
  public difficulty!: string;

  @IsArray()
  @ValidateNested({ each: true })
  public status!: ETestStatus[];

  @IsArray()
  @ValidateNested({ each: true })
  public words!: TestWordListDto[];

  @IsArray()
  public wordbooks!: string[];

  @IsNumber()
  public score!: number;
}
