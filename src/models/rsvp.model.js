import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Event from "./events.model.js";

const RSVP = sequelize.define("RSVP", {
  status: { type: DataTypes.ENUM("pending", "approved"), defaultValue: "pending" },
});

User.belongsToMany(Event, { through: RSVP, foreignKey: "userId" });
Event.belongsToMany(User, { through: RSVP, foreignKey: "eventId" });

export default RSVP;

