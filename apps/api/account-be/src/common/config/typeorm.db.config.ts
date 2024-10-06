import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'node:path';

// export const TypeOrmDbConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: process.env.DATASOURCE_HOST,
//   port: Number(process.env.DATASOURCE_PORT),
//   username: process.env.DATASOURCE_USER,
//   password: process.env.DATASOURCE_PWD,
//   database: process.env.DATASOURCE_SCHEMA,
//   entities: [path.join(__dirname, '..', '..', '**', '*.entity{.ts,.js}')],
//   synchronize: false,
//   logging: true,
// };

export const TypeOrmDbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: Number(3306),
  username: 'root',
  password: '',
  database: 'account',
  entities: [path.join(__dirname, '..', '..', '**', '*.entity{.ts,.js}')],
  synchronize: false,
  logging: true,
};
