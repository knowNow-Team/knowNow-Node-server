import mongoose from 'mongoose';

export default class DBConnection {
  private url: string =
    process.env.NODE_ENV === 'production'
      ? `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PWD}@${process.env.MONGO_IP}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
      : `mongodb://localhost:27017/${process.env.MONGO_DB}`;

  constructor() {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    this.connect();
    // 몽구스 커넥션에 이벤트 리스너, 에러 발생 시 에러 내용 기록, 연결 종료 시 재연결 시도
    mongoose.connection.on('error', (error) => {
      global._logger.error('몽고디비 연결 에러', error);
    });

    mongoose.connection.on('disconnected', () => {
      global._logger.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
      this.connect();
    });
  }

  // 개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인할 수 있게 하는 코드
  private connect = (): void => {
    mongoose
      .connect(this.url, {
        dbName: process.env.MONGO_DB,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => global._logger.info('몽고디비 연결 성공'))
      .catch((error: Error) => global._logger.error('몽고디비 연결 에러', error?.message));
  };
}
