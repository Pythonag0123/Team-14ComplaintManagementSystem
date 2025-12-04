import {
  createComplaint,
  getComplaintById,
  getComplaintsByUser
} from "../models/Complaint.js";
import {
  addComment,
  getCommentsForComplaint
} from "../models/Comment.js";
import { getAllCategories } from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createNewComplaint = async (req, res) => {
  try {
    const { categoryId, title, description, priority } = req.body;
    const attachmentPath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!categoryId || !title || !description || !priority) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const complaintId = await createComplaint({
      userId: req.user.id,
      categoryId,
      title,
      description,
      priority,
      attachmentPath
    });

    const complaint = await getComplaintById(complaintId);
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await getComplaintsByUser(req.user.id);
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getComplaintDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const complaint = await getComplaintById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    const comments = await getCommentsForComplaint(id);
    res.json({ complaint, comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addComplaintComment = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message required" });
    }
    await addComment({
      complaintId,
      userId: req.user.id,
      message
    });
    const comments = await getCommentsForComplaint(complaintId);
    res.status(201).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
