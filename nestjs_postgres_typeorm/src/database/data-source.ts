import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from './entities/User';
import { Profile } from './entities/Profile';
import { Post } from './entities/Post';

export const dataSourcesOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'nestjs_postgres',
  synchronize: false,
  logging: ['error', 'query', 'log', 'warn', 'migration', 'schema'],
  entities: [User, Profile, Post],
  migrations: ['./src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  seeds: ['./src/database/seeds/*.ts'],
  subscribers: ['./src/database/seeds/*.ts'],
};

const dataSource = new DataSource({ ...dataSourcesOptions });
dataSource.initialize();

export default dataSource;
/* run this commands to generate migration file*/
// npm run typeorm:generate-migration --name=migration

/* run this command to run migration */
// npm run migration:run
