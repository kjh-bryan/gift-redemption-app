import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../connections/db";

export interface TeamAttributes {
  team_name: string;
}

export class Team extends Model<TeamAttributes> {
  declare team_name: string;
}

Team.init(
  {
    team_name: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: "team",
  },
);
