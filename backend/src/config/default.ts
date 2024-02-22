import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  POSTGRESQL_HOST: process.env.POSTGRESQL_HOST ?? "",
  POSTGRESQL_PORT: process.env.POSTGRESQL_PORT ?? 5432,
  POSTGRESQL_DB: process.env.POSTGRESQL_DB ?? "",
  POSTGRESQL_USERNAME: process.env.POSTGRESQL_USERNAME ?? "",
  POSTGRESQL_PASSWORD: process.env.POSTGRESQL_PASSWORD ?? "",
};
