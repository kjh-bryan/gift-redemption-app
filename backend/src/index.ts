import app from "./app";
import { sequelize } from "./connections/db";
import { intialiseData, intialiseTable } from "./connections/initdata";
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync();
    // await sequelize.sync({ force: true });
    intialiseTable();
    await intialiseData();
    app.listen(PORT, () => {
      console.log(`Server has started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error syncing Sequelize models:", error);
  }
})();
