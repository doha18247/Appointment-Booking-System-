const express = require('express');
const router = express.Router();
const { getAllProfessionals } = require('../controllers/professionalController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, getAllProfessionals);

module.exports = router;
