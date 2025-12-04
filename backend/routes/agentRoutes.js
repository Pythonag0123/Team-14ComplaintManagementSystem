const express = require('express');
const router = express.Router();
const { getAgentComplaints, resolveComplaint } = require('../controllers/agentController');

router.get('/:agentName', getAgentComplaints);
router.patch('/resolve/:id', resolveComplaint);

module.exports = router;
