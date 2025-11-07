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

export default router;

