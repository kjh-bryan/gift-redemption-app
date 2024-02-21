import app from "./app";
import { sequelize } from "./connections/db";
import { intialiseData, intialiseAssociations } from "./connections/initdata";
import config from "./config/default";

const PORT = config.PORT || 6000;

(async () => {
  try {
    await intialiseAssociations();
    await sequelize.sync({ force: true });
    await intialiseData();
    app.listen(PORT, () => {
      console.log(`Server has started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error syncing Sequelize models:", error);
  }
})();
