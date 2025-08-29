import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export default (sequelize: Sequelize) => {
  class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
    declare address: string;
    declare phoneNumber: string;
    declare gender: boolean;
    declare image: string | null;
    declare roleId: string | null;
    declare positionId: string | null;

    static associate(models: any) {
      // define associations here
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
    }
  );

  return User;
};




