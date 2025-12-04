WEBENDTERMGROUP14
COMPLAINT MANAGEMENT SYSTEM
team members:
ADITYA MAHESHWARI 2315000123 
 KINJAL GUPTA 2315001134 CSE 
 PRIYANSHU NAYAK 2315510154 
 KHUSHI GANGWAR 2315510100 ( Captain)
 PRIYA GOYAL 2315510151 AIML
 work load divide:





Member 1 — User UI (Frontend)



Page 1: “File Complaint”

Inputs: name, category, description, priority

File upload (optional)

Button → POST /complaints

Page 2: “My Complaints”

GET /complaints?role=user

Show simple list with status + ticket ID

No CSS needed except basic alignment.

Branch: feature-user-ui

Member 2 — Admin UI (Frontend)


Table of all complaints (GET /complaints)

Column: “Assign to Agent”

Dropdown with 2 hardcoded agents (e.g., Agent A, Agent B)

Button → PATCH /complaints/:id/assign

Branch: feature-admin-ui

Member 3 — Agent UI (Frontend)



GET /complaints?agentId=1

Show tickets assigned to the agent

Button: “Mark as Resolved”

PATCH /complaints/:id/status

Branch: feature-agent-ui

Member 4 — Core Backend (Complaints + Assignment + Status)



POST /complaints

GET /complaints (filter by role/user/agent)

PATCH /complaints/:id/assign

PATCH /complaints/:id/status

Serve file uploads (optional tiny route)

Use in-memory DB (array) or SQLite to save time.

Example complaint object:

{
  "id": 1,
  "userName": "Aster",
  "category": "IT",
  "priority": "High",
  "description": "Wifi not working",
  "status": "New",
  "assignedTo": null
}


Branch: feature-backend

Member 5 — Integrations + Repo Setup + Testing


Tasks:

Create repo + folder structure

Create CORS + connection between frontend & backend

Add sample categories (IT, HR, Sanitation)

Test each endpoint as Member 4 completes

Help Members 1/2/3 with API calls

Deploy to localhost only (no cloud needed)

Merge all PRs → resolve conflicts

Branch: feature-setup

⏳ Timeline (Strict)
0:00–0:10

Member 5 sets up repo + pushes base structure

Others pull & create branches

0:10–0:30

Member 4 builds /complaints POST + GET

Members 1/2/3 build static UI mock

0:30–1:00

Member 4 builds assign + status update routes

Member 1 integrates create + list

Member 2 integrates assign

Member 3 integrates resolve

1:00–1:30

Member 5 tests everything

Fix small bugs

Merge branches → main

1:30–2:00

Final testing

Make quick demo script

If time left → add tiny feature (feedback or file upload)
