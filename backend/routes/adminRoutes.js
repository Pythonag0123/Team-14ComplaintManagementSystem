const express = require('express');
const router = express.Router();
const { getAllComplaints, assignComplaint } = require('../controllers/adminController');

router.get('/complaints', getAllComplaints);
router.patch('/assign/:id', assignComplaint);

module.exports = router;
