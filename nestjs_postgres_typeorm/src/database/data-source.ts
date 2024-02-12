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
  synchronize: false,
  logging: ['error', 'query', 'log', 'warn', 'migration', 'schema'],
  entities: [__dirname + '/entities/**.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/**.{js,ts}'],
  seeds: [__dirname + '/seeds/**.seed.{js,ts}'],
  subscribers: [__dirname + '/subscribers/**.subscriber.{js,ts}'],
};

const dataSource = new DataSource(dataSourcesOptions);
dataSource.initialize();

export default dataSource;
