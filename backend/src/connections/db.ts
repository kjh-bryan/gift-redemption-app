import { Sequelize } from "sequelize";

import config from "../config/default";

const sequelize = new Sequelize({
  host: config.POSTGRESQL_HOST,
  dialect: "postgres",
  database: config.POSTGRESQL_DB,
  username: config.POSTGRESQL_USERNAME,
  password: config.POSTGRESQL_PASSWORD,
  port: config.POSTGRESQL_PORT as number,
  logging: false,
});
export { sequelize };
