// src/controllers/rsvpController.js
import RSVP from "../models/rsvp.model.js";
import Event from "../models/events.model.js";
import User from "../models/user.model.js";

/**
 * POST /api/rsvps/:eventId
 * Allow a logged-in user to RSVP for an event
 */
export const createRSVP = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;

  try {
    // Check event existence
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if event capacity reached
    const approvedCount = await RSVP.count({
      where: { eventId, status: "approved" },
    });
    if (approvedCount >= event.maxAttendees)
      return res.status(400).json({ message: "Event is full" });

    // Check if user already RSVP’d
    const existing = await RSVP.findOne({
      where: { userId, eventId },
    });
    if (existing)
      return res.status(400).json({ message: "Already RSVP'd for this event" });

    // Create new RSVP
    const rsvp = await RSVP.create({
      userId,
      eventId,
      status: "pending",
    });

    res.status(201).json({
      message: "RSVP submitted successfully",
      rsvp,
    });
  } catch (err) {
    console.error("Error in createRSVP:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/rsvps/:eventId
 * Organizer fetches all RSVPs for their event
 */
export const getRSVPsForEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // ensure only the organizer can view RSVPs
    if (event.organizerId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const rsvps = await RSVP.findAll({
      where: { eventId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.json({ count: rsvps.length, rsvps });
  } catch (err) {
    console.error("Error in getRSVPsForEvent:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/rsvps/:eventId/:rsvpId/approve
 * Organizer approves a pending RSVP
 */
export const approveRSVP = async (req, res) => {
  const { eventId, rsvpId } = req.params;

  try {
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.organizerId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const rsvp = await RSVP.findByPk(rsvpId);
    if (!rsvp) return res.status(404).json({ message: "RSVP not found" });

    // Ensure capacity not exceeded before approving
    const approvedCount = await RSVP.count({
      where: { eventId, status: "approved" },
    });

    if (approvedCount >= event.maxAttendees)
      return res
        .status(400)
        .json({ message: "Max attendees reached. Cannot approve more." });

    await rsvp.update({ status: "approved" });

    res.json({ message: "RSVP approved successfully", rsvp });
  } catch (err) {
    console.error("Error in approveRSVP:", err);
    res.status(500).json({ message: "Server error" });
  }
};

