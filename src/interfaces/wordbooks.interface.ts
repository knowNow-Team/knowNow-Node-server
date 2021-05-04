export interface IWordList {
  wordId: string;
  filter?: EFilter;
  isRemoved?: boolean;
  addedAt?: Date;
}

export interface IWordbook {
  title: string; // 단어장 제목
  owner: number; // 단어장 소유자
  quantity: number; // 단어장 단어 개수
  words: IWordList[]; // 단어 정보
}

export enum EFilter {
  memorized = 'memorized', // 외웠어요
  confused = 'confused', // 헷갈려요
  doNotKnow = 'doNotKnow', // 몰라요
}
