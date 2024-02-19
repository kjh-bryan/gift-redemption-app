import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../connections/db";
import { v4 as uuidv4 } from "uuid";

export interface UserAttributes {
  username: string;
  password: string;
  role: string;
}

export class User extends Model<UserAttributes> {
  declare username: string;
  declare password: string;
  declare role: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: "user",
  },
);
