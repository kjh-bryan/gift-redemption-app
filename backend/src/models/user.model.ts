import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import { sequelize } from "../connections/db";
import { Role } from "./role.model";

export interface UserAttributes {
  username: string;
  password: string;
  role_name: string;
}

export class User extends Model<UserAttributes> {
  declare username: string;
  declare password: string;
  declare role_name: ForeignKey<Role["role_name"]>;
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
    role_name: {
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
