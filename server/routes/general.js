import express from "express";
import axios from "axios";
import { getUser, getDashboardStats } from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);

// Proxy route for FRED API
router.get("/fred/series/observations", async (req, res) => {
  try {
    const { series_id, api_key, file_type, units, observation_start } = req.query;
    const response = await axios.get("https://api.stlouisfed.org/fred/series/observations", {
      params: { series_id, api_key, file_type, units, observation_start },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from FRED API:", error);
    res.status(500).json({ error: "Failed to fetch data from FRED API" });
  }
});

export default router;
