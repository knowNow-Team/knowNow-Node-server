import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
};
mongoose.connect(
  `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PWD}@${process.env.MONGO_IP}:27017/${process.env.MONGO_DB}`,
  {
    dbName: 'KnowNow',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공!');
    }
  },
);

// 몽구스 커넥션에 이벤트 리스너, 에러 발생 시 에러 내용 기록, 연결 종료 시 재연결 시도
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

export default connect;
