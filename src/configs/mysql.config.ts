// import config from 'config';
import path from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';
import { dbConfig } from '@interfaces/db.interface';

// const { host, user, password, database }: dbConfig = config.get('dbConfig');
const { host, user, password, database }: dbConfig =
  process.env.NODE_ENV === 'production'
    ? {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.MYSQL_DB,
      }
    : {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'knownow',
      };

export default class MysqlDBConnection {
  private connectionInfo: ConnectionOptions = {
    type: 'mysql',
    host: host,
    port: 3306,
    username: user,
    password: password,
    database: database,
    synchronize: true,
    logging: ['error'],
    entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '../**/*.migration{.ts,.js}')],
    subscribers: [path.join(__dirname, '../**/*.subscriber{.ts,.js}')],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  };

  constructor() {
    createConnection(this.connectionInfo)
      .then(() => {
        global._logger.info('MysqlDB connect success');
      })
      .catch((error) => {
        global._logger.error('MysqlDB connect error', error);
      });
  }
}
