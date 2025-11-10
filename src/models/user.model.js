import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import {nanoid} from 'nanoid';

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => nanoid(8),
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("user", "organizer"), defaultValue: "user" },
});

export default User;

