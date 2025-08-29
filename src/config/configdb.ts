import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('baitap2', 'root', '' as unknown as string, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
} as any);

const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;





