export interface IWordbook {
  title: string; // 단어장 제목
  owner: number; // 단어장 소유자
}

export enum EFilter {
  memorized = 'memorized', // 외웠어요
  confused = 'confused', // 헷갈려요
  doNotKnow = 'doNotKnow', // 몰라요
}
