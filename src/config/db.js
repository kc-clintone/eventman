import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DATABASE_URL,
  username: "postgres",
  password: process.env.PASSWD,
  database: "postgres",
  port: 5432,
  logging: false,
});

export default sequelize;
