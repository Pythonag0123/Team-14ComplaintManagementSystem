import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import {
  createNewComplaint,
  getMyComplaints,
  getComplaintDetails,
  addComplaintComment,
  getCategories
} from "../controllers/complaintController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  }
});
const upload = multer({ storage });

router.get("/categories", protect, getCategories);
router.post("/", protect, upload.single("attachment"), createNewComplaint);
router.get("/my", protect, getMyComplaints);
router.get("/:id", protect, getComplaintDetails);
router.post("/:id/comments", protect, addComplaintComment);

export default router;
