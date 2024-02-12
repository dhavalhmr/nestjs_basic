import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSources: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'nestjs_postgres',
  // entities: [User, Profile, Post],
  entities: [__dirname + '/entities/**.{js,ts}'],
  synchronize: true,
  logging: ['error', 'query', 'log', 'warn', 'migration', 'schema'],
};
