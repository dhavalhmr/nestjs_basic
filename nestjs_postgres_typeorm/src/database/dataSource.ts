import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourcesOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'nestjs_postgres',
  // entities: [User, Profile, Post],
  entities: [__dirname + '/entities/**.{js,ts}'],
  synchronize: false,
  // logging: ['error', 'query', 'log', 'warn', 'migration', 'schema'],
  migrations: [__dirname + '/migrations/**.{js,ts}'],
};

const dataSource = new DataSource(dataSourcesOptions);
dataSource.initialize();

export default dataSource;
