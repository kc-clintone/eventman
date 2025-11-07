import express from "express";
import {
  createRSVP,
  getRSVPsForEvent,
  approveRSVP
} from "../controllers/rsvpController.js";

import { protect, organizerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:eventId", protect, createRSVP);
router.get("/:eventId", protect, organizerOnly, getRSVPsForEvent);
router.put("/:eventId/:rsvpId/approve", protect, organizerOnly, approveRSVP);

export default router;

