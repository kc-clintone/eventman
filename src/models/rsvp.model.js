import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Event from "./events.model.js";
import {nanoid} from 'nanoid';

const RSVP = sequelize.define("RSVP", {
    id: {
    type: DataTypes.UUID,
    defaultValue: () => nanoid(8),
    primaryKey: true,
  },
  status: { type: DataTypes.ENUM("pending", "approved"), defaultValue: "pending" },
});

// Associating User to Event
User.belongsToMany(Event, { through: RSVP, foreignKey: "userId" });
Event.belongsToMany(User, { through: RSVP, foreignKey: "eventId" });

// linking rsvp back to user (i had no quik fix)
RSVP.belongsTo(User, { foreignKey: "userId" });
RSVP.belongsTo(Event, { foreignKey: "eventId" });
User.hasMany(RSVP, { foreignKey: "userId" });
Event.hasMany(RSVP, { foreignKey: "eventId" });

export default RSVP;

