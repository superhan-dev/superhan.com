import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import * as path from 'path';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'mysql.db.config',
  (): MysqlConnectionOptions => ({
    type: 'mysql',
    host: process.env.DATASOURCE_HOST,
    port: Number(process.env.DATASOURCE_PORT),
    username: process.env.DATASOURCE_USER,
    password: process.env.DATASOURCE_PWD,
    database: process.env.DATASOURCE_SCHEMA,
    entities: [
      path.resolve(__dirname, '..', '..', '..') + '/**/*.entity{.ts,.js}',
    ],
    synchronize: false,
    logging: true,
    charset: 'utf8mb4',
    timezone: 'Asia/Seoul',
  })
);
