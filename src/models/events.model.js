import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import { v4 as uuidv4 } from "uuid";

const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATE, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  maxAttendees: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 },
});

User.hasMany(Event, { foreignKey: "organizerId" });
Event.belongsTo(User, { as: "organizer" });

export default Event;

