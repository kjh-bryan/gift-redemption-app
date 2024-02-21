import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../connections/db";

export interface RoleAttributes {
  role_name: string;
}

export class Role extends Model<RoleAttributes> {
  declare role_name: string;
}

Role.init(
  {
    role_name: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: "role",
  },
);
