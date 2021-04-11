export interface IWord {
  wordId: string; // 영어단어 id
  isCorrect: boolean; // 정답 여부
  answer?: string; // 제출한 정답
}

export enum ETestStatus {
  memorized = 'memorized', // 외웠어요
  confused = 'confused', // 헷갈려요
  doNotKnow = 'doNotKnow', // 몰라요
}

export interface ITest {
  testerId: string; // 시험친 유저
  difficulty: string; // 난이도
  status: ETestStatus[]; // 몰라요, 헷갈려요, 다외웠어요 타입
  words: IWord[]; // 영어단어 리스트
  wordbooks: string[]; // 영어단어장 리스트
  score: number; // 점수
}
