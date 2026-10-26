const User = require('../models/usersModel');

// Get all professionals (users with role = 'professional')
exports.getAllProfessionals = async (req, res) => {
  try {
    const professionals = await User.find({ role: 'professional' }, '_id name email');
    res.json({ success: true, professionals });
  } catch (error) {
    console.error('Error fetching professionals:', error);
    res.status(500).json({ message: 'Error fetching professionals' });
  }
};
