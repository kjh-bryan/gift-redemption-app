import { Gift } from "../models/gift.model";
import { Team } from "../models/team.model";
import { User } from "../models/user.model";
import { UserTeam } from "../models/user-team.model";
import { Redemption } from "../models/redemption.model";
import { csvToDb } from "../utils/csv-to-db";

export const intialiseTable = () => {
  User.hasMany(UserTeam, { foreignKey: "staff_pass_id" });
  Team.hasMany(UserTeam, { foreignKey: "team_name" });
  UserTeam.belongsTo(User, { foreignKey: "staff_pass_id" });
  UserTeam.belongsTo(Team, { foreignKey: "team_name" });

  Team.hasMany(Redemption, { foreignKey: "team_name" });
  Redemption.belongsTo(Team, { foreignKey: "team_name" });

  Gift.hasOne(Redemption, { foreignKey: "gift_name" });
  Redemption.belongsTo(Gift, { foreignKey: "gift_name" });
};

export const intialiseData = async () => {
  try {
    const { users, teams, user_teams } = await csvToDb();
    const userCount = await User.count();
    if (userCount === 0) {
      await User.bulkCreate(users);
    }

    const teamCount = await Team.count();
    if (teamCount === 0) {
      await Team.bulkCreate(teams);
    }

    const userTeamCount = await UserTeam.count();
    if (userTeamCount === 0) {
      await UserTeam.bulkCreate(user_teams);
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
