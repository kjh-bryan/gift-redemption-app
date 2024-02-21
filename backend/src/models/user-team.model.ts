import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import { sequelize } from "../connections/db";
import { User } from "./user.model";
import { Team } from "./team.model";

export interface UserTeamAttributes {
  staff_pass_id: string;
  team_name: string;
  created_at?: Date;
}

export class UserTeam extends Model<UserTeamAttributes> {
  declare staff_pass_id: ForeignKey<User["username"]>;
  declare team_name: ForeignKey<Team["team_name"]>;
  declare created_at: Date;
}

UserTeam.init(
  {
    staff_pass_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    team_name: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: "user_team",
  },
);
