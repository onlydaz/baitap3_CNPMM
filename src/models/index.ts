import { Sequelize } from 'sequelize';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - JSON config typing not required
import allConfig from '../config/config.json';
import userFactory from './user';

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const config = (allConfig as any)[env];

let sequelize: Sequelize;
if (config && config.use_env_variable) {
  const connStr = process.env[config.use_env_variable] as string;
  sequelize = new Sequelize(connStr, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const User = userFactory(sequelize);

const db = {
  sequelize,
  Sequelize,
  User,
};

export type DB = typeof db;
export { sequelize, User };
export default db;


