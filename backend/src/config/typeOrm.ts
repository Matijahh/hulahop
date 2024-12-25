import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { config } from '../commons/config';

ConfigModule.forRoot();
export const typeOrmConfig = (): any => {
  return {
    type: 'mysql',
    host: config.db.host,
    port: Number(config.db.port),
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    entities: [
      join(__dirname, '..', '**', '*.entity.{ts,js}'),
      join(__dirname, '..', '**', 'entities/*.{ts,js}'),
    ],
    synchronize: false,
  };
};
