import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import { sequelize } from "../connections/db";
import { v4 as uuidv4 } from "uuid";
import { Gift } from "./gift.model";
import { Team } from "./team.model";

export interface RedemptionAttributes {
  gift_name: ForeignKey<number>;
  team_name: string;
  redeemed_at: Date;
}

export class Redemption extends Model<RedemptionAttributes> {
  declare gift_name: ForeignKey<Gift["gift_name"]>;
  declare team_name: ForeignKey<Team["team_name"]>;
  declare redeemed_at: Date;
}

Redemption.init(
  {
    gift_name: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    team_name: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    redeemed_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: "redemption",
  },
);
