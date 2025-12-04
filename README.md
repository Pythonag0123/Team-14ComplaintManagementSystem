# 📢 Complaint Management System

### **WEB END TERM PROJECT — GROUP 14**
## 📸 Lodge a Complaint – UI Preview

The system provides a clean and intuitive interface for users to submit complaints easily.  
Users can enter the title, choose a category, set priority, write a description, and upload attachments (Images/PDF).

### 📝 Screenshot: Lodge a Complaint Form
![Lodge Complaint Screenshot](NewComplaint.png)


A minimal, functional Complaint Management System built under strict time constraints. The system allows users to file complaints, admins to assign them, and agents to resolve them.

---

## 👥 Team Members

* **Khushi Gangwar (Captain)** — 2315510100 — AIML
* Aditya Maheshwari — 2315000123 — CSE
* Kinjal Gupta — 2315001134 — CSE
* Priyanshu Nayak — 2315510154 — AIML
* Priya Goyal — 2315510151 — AIML

---

## ⚡ Workload Division (Minimal — 2 Hour Build)

### 🟦 Member 1 — User UI (Frontend)

**Branch:** `feature-user-ui`

* Page: **File Complaint** (name, category, description, priority, optional file)
* Page: **My Complaints** (list complaints using `GET /complaints?role=user`)
* Basic alignment only; no heavy CSS.

---

### 🟥 Member 2 — Admin UI (Frontend)

**Branch:** `feature-admin-ui`

* Table of all complaints (`GET /complaints`)
* Dropdown: **Assign to Agent** (2 hardcoded agents)
* Button → `PATCH /complaints/:id/assign`

---

### 🟩 Member 3 — Agent UI (Frontend)

**Branch:** `feature-agent-ui`

* Fetch assigned tickets (`GET /complaints?agentId=1`)
* Show list
* Button: **Mark as Resolved** → `PATCH /complaints/:id/status`

---

### 🟧 Member 4 — Core Backend

**Branch:** `feature-backend`

* `POST /complaints`
* `GET /complaints` (role/user/agent filtering)
* `PATCH /complaints/:id/assign`
* `PATCH /complaints/:id/status`
* Optional: file upload route
* Use in-memory DB or SQLite

**Sample Complaint Object:**

```
{
  "id": 1,
  "userName": "Aster",
  "category": "IT",
  "priority": "High",
  "description": "Wifi not working",
  "status": "New",
  "assignedTo": null
}
```

---

### 🟪 Member 5 — Repo Setup + Integration + Testing

**Branch:** `feature-setup`

* Create repo + folder structure
* Enable CORS + backend-frontend connection
* Add sample categories (IT, HR, Sanitation)
* Test all backend routes
* Assist frontend members with API calls
* Merge PRs + resolve conflicts

---


## 🧪 Demo Flow (For Judges)

1. User files complaint
2. Admin assigns to agent
3. Agent resolves ticket
4. User sees updated status

---

