import { CreationOptional, DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../connections/db";
import { v4 as uuidv4 } from "uuid";

export interface GiftAttributes {
  gift_name: string;
  created_at?: Date;
}

export class Gift extends Model<GiftAttributes> {
  declare gift_name: string;
  declare created_at: Date;
}

Gift.init(
  {
    gift_name: {
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
    tableName: "gift",
  },
);
