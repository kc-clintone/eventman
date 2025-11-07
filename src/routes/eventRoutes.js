import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";
import { protect, organizerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public and authenticated routes
router.get("/", getEvents);
router.get("/:id", getEventById);

// Organizer-only routes
router.post("/", protect, organizerOnly, createEvent);
router.put("/:id", protect, organizerOnly, updateEvent);
router.delete("/:id", protect, organizerOnly, deleteEvent);

export default router;

