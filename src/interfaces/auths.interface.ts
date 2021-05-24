export interface DataStoredInToken {
  userId: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface IUserScoreInfo {
  examCount?: number;
  wordCount?: number;
  correctPercentage?: number;
}
