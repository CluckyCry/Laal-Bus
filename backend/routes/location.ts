import express, { Request, Response } from "express";
import Location from "../models/Location"; // Import your Location model

const router = express.Router();

// POST route to save a location
router.post("/location", async (req: Request, res: Response): Promise<void> => {
  try {
    const { driverId, latitude, longitude } = req.body;

    // Validation
    if (!driverId || !latitude || !longitude) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const location = new Location({ driverId, latitude, longitude });
    await location.save();
    res.status(201).json({ message: "Location saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving location." });
  }
});

export default router;
