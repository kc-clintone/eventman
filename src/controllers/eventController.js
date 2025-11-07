import Event from "../models/events.model.js";
import { Op } from "sequelize";

// Create event (organizer only)
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, maxAttendees } = req.body;

    if (!title || !date || !location || !maxAttendees)
      return res.status(400).json({ message: "Missing required fields" });

    const event = await Event.create({
      title,
      description,
      date,
      location,
      maxAttendees,
      organizerId: req.user.id
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all events (with pagination + filtering)
export const getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, date, location, keyword } = req.query;
    const offset = (page - 1) * limit;

    const filters = {};
    if (date) filters.date = date;
    if (location) filters.location = { [Op.iLike]: `%${location}%` };
    if (keyword)
      filters[Op.or] = [
        { title: { [Op.iLike]: `%${keyword}%` } },
        { description: { [Op.iLike]: `%${keyword}%` } }
      ];

    const events = await Event.findAndCountAll({
      where: filters,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [["date", "ASC"]]
    });

    res.json({
      total: events.count,
      page: parseInt(page),
      totalPages: Math.ceil(events.count / limit),
      data: events.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update event (organizer only)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.organizerId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await event.update(req.body);
    res.json({ message: "Event updated", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete event (organizer only)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.organizerId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await event.destroy();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

