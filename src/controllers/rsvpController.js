import RSVP from "../models/rsvp.model.js";
import Event from "../models/events.model.js";
import User from "../models/user.model.js";

// User RSVP to an event
export const createRSVP = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if capacity reached
    const currentCount = await RSVP.count({
      where: { eventId: event.id, status: "approved" }
    });

    if (currentCount >= event.maxAttendees)
      return res.status(400).json({ message: "Event is full" });

    // Check if user already RSVP'd
    const existing = await RSVP.findOne({
      where: { userId: req.user.id, eventId: event.id }
    });

    if (existing)
      return res.status(400).json({ message: "Already RSVP'd for this event" });

    const rsvp = await RSVP.create({
      userId: req.user.id,
      eventId: event.id,
      status: "pending"
    });

    res.status(201).json({ message: "RSVP submitted successfully", rsvp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Organizer fetch RSVPs for an event
export const getRSVPsForEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.organizerId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const rsvps = await RSVP.findAll({
      where: { eventId: event.id },
      include: [{ model: User, attributes: ["id", "name", "email"] }]
    });

    res.json(rsvps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Organizer approve an RSVP
export const approveRSVP = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.organizerId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const rsvp = await RSVP.findByPk(req.params.rsvpId);
    if (!rsvp) return res.status(404).json({ message: "RSVP not found" });

    // Capacity check before approving
    const approvedCount = await RSVP.count({
      where: { eventId: event.id, status: "approved" }
    });
    if (approvedCount >= event.maxAttendees)
      return res.status(400).json({ message: "Max attendees reached" });

    await rsvp.update({ status: "approved" });
    res.json({ message: "RSVP approved successfully", rsvp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

