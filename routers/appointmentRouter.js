const express = require("express");
const router = express.Router();
const {
  createAppointment,
  updateAppointment,
  getAppointments,
  cancelAppointment,
  getAvailableSlots,
} = require("../controllers/appointmentController");

const { verifyToken, checkRole } = require("../middlewares/auth");

// Get available time slots for a specific doctor+date
router.get("/slots", verifyToken, getAvailableSlots);

// CRUD
router.post("/", verifyToken, checkRole(["user"]), createAppointment);
router.get("/", verifyToken, getAppointments);
router.put("/:id", verifyToken, checkRole(["user", "professional"]), updateAppointment);
router.delete("/:id", verifyToken, checkRole(["user", "professional", "admin"]), cancelAppointment);

module.exports = router;
