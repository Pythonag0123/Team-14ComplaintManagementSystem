// Import complaints from adminController to share the in-memory data
const { complaints } = require('./adminController');

// 1. getAgentComplaints
// Route: GET /agent/:agentName
const getAgentComplaints = (req, res) => {
    const { agentName } = req.params;
    const agentComplaints = complaints.filter((c) => c.assignedTo === agentName);
    res.json(agentComplaints);
};

// 2. resolveComplaint
// Route: PATCH /agent/resolve/:id
const resolveComplaint = (req, res) => {
    const { id } = req.params;
    const complaint = complaints.find((c) => c.id == id);

    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = "Resolved";
    res.json(complaint);
};

module.exports = { getAgentComplaints, resolveComplaint };
