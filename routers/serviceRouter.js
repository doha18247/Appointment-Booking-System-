const express = require("express");
const router = express.Router();
const {
  createService,
  getAllServices,
  getServicesByProfessional,
  updateService,
  deleteService
} = require("../controllers/serviceController");

const { verifyToken, checkRole } = require("../middlewares/auth");

// Filter services by professionalId — used by booking form dropdown
router.get("/by-professional", verifyToken, checkRole(['professional', 'admin', 'user']), getServicesByProfessional);

router.post('/', verifyToken, checkRole(['professional', 'admin']), createService);
router.get("/", verifyToken, checkRole(['professional', 'admin', 'user']), getAllServices);
router.put("/:id", verifyToken, checkRole(['professional', 'admin']), updateService);
router.delete("/:id", verifyToken, checkRole(['professional', 'admin']), deleteService);

module.exports = router;
