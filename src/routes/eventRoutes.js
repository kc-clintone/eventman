import express from "express";

const router = express.Router();

// Public and authenticated routes
router.get("/", getEvents);
router.get("/:id", getEventById);

export default router;

