import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "db.zgstfiwkebxglynulwsm.supabase.co",
  username: "postgres",
  password: "bkhqC7fe7?&3LMu",
  database: "postgres",
  port: 5432,
  logging: false,
});

export default sequelize;
