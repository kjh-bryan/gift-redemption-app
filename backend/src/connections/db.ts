import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "postgres",
  database: "postgres",
  username: "postgres",
  password: "admin",
  port: 5432,
  logging: false,
});
export { sequelize };
