import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("user", "organizer"), defaultValue: "user" },
});

export default User;

