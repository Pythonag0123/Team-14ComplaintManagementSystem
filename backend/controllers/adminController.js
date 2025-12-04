const complaints = [
  {
    id: 1,
    userName: "Test User",
    category: "IT",
    priority: "High",
    description: "Wifi not working",
    status: "New",
    assignedTo: null
  }
];

// 1. getAllComplaints
// Route: GET /admin/complaints
const getAllComplaints = (req, res) => {
  res.json(complaints);
};

// 2. assignComplaint
// Route: PATCH /admin/assign/:id
const assignComplaint = (req, res) => {
  const { id } = req.params;
  const { agent } = req.body;

  const complaint = complaints.find((c) => c.id == id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  complaint.assignedTo = agent;
  complaint.status = "Assigned";

  res.json(complaint);
};

module.exports = { getAllComplaints, assignComplaint, complaints };
