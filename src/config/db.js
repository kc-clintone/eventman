import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import dns from 'dns';

dotenv.config();

dns.setDefaultResultOrder('ipv4first');

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DATABASE_URL,
  username: process.env.USR,
  password: process.env.PASSWD,
  database: "postgres",
  port: 6543,
  logging: false,
});

export default sequelize;
