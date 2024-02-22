import { Gift } from "../models/gift.model";
import { Team } from "../models/team.model";
import { User, UserAttributes } from "../models/user.model";
import { UserTeam } from "../models/user-team.model";
import { Redemption } from "../models/redemption.model";
import { csvToDb } from "../utils/csv-to-db";
import { Role } from "../models";
import bcrypt from "bcryptjs";

export const intialiseAssociations = async () => {
  console.log("Defining Table Associations");
  User.hasMany(UserTeam, { foreignKey: "staff_pass_id" });
  Team.hasMany(UserTeam, { foreignKey: "team_name" });
  UserTeam.belongsTo(User, { foreignKey: "staff_pass_id" });
  UserTeam.belongsTo(Team, { foreignKey: "team_name" });

  User.belongsTo(Role, { foreignKey: "role_name", targetKey: "role_name" });
  Role.hasOne(User, { foreignKey: "role_name", sourceKey: "role_name" });

  Team.hasMany(Redemption, { foreignKey: "team_name" });
  Redemption.belongsTo(Team, { foreignKey: "team_name" });

  Gift.hasOne(Redemption, { foreignKey: "gift_name" });
  Redemption.belongsTo(Gift, { foreignKey: "gift_name" });
};

export const intialiseData = async () => {
  console.log("Intialising Data");

  try {
    const { users, roles, teams, user_teams } = await csvToDb();

    const roleCount = await Role.count();
    if (roleCount === 0) {
      await Role.bulkCreate([...roles, { role_name: "ADMIN" }]);
    }
    const userCount = await User.count();
    if (userCount === 0) {
      const hashedUsers = await hashUserPasswords([
        ...users,
        {
          username: "ADMIN",
          password: "admin",
          role_name: "ADMIN",
        },
      ]);

      await User.bulkCreate(hashedUsers);
    }

    const teamCount = await Team.count();
    if (teamCount === 0) {
      await Team.bulkCreate([
        ...teams,
        { team_name: "UNASSIGNED" },
        { team_name: "ADMINISTRATOR" },
      ]);
    }

    const userTeamCount = await UserTeam.count();
    if (userTeamCount === 0) {
      await UserTeam.bulkCreate([
        ...user_teams,
        { team_name: "ADMINISTRATOR", staff_pass_id: "ADMIN" },
      ]);
    }

    const giftCount = await Gift.count();
    if (giftCount === 0) {
      await Gift.bulkCreate([
        { gift_name: "Books Gift Voucher Feb 2024" },
        { gift_name: "Movie Tickets Mar 2024" },
        { gift_name: "Amazon Gift Card Apr 2024" },
      ]);
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

export const hashUserPasswords = async (users: UserAttributes[]) => {
  try {
    const hashedUsers = [];
    const hashedPasswords: Record<string, string> = {};
    for (const user of users) {
      let hashedPassword = "";
      if (hashedPasswords[user.password] == undefined) {
        hashedPassword = await bcrypt.hash(user.password, 10);
        hashedPasswords[user.password] = hashedPassword;
      } else {
        hashedPassword = hashedPasswords[user.password];
      }
      hashedUsers.push({
        ...user,
        password: hashedPassword,
      });
    }

    return hashedUsers;
  } catch (error) {
    throw new Error("Error hashing passwords: " + error);
  }
};
