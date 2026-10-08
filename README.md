# 🤖 AI-Powered Kanban

> **An AI-powered predictive project management platform that helps teams manage tasks, identify project risks, monitor project health, and receive intelligent recommendations before problems become blockers.**

Built with **React + Django REST Framework + Groq AI**.

---

## 🚀 Overview

Traditional Kanban applications help users organize and track tasks, but they generally depend on users noticing project problems themselves.

**AI-Powered Kanban** goes one step further by combining Kanban project management with deterministic risk detection, project health analysis, and AI-powered recommendations.

The platform helps identify:

* Overdue tasks
* High-priority risks
* Tasks approaching deadlines
* Blocked tasks
* Dependency-related risks
* Overall project health
* Project-level risk
* Recommended actions for risky tasks

The goal is to move from **reactive task management** toward **predictive project management**.

---

## 🎯 Problem Statement

In conventional project management systems, users often discover problems only after they become serious.

For example:

* A high-priority task may be close to its deadline.
* A task may be blocked by another unfinished task.
* Several tasks may remain incomplete.
* A project may appear active while actually being at risk.

Manually monitoring all these factors becomes difficult as projects grow.

### 💡 Solution

The platform combines structured project metrics, deterministic risk analysis, and AI-powered recommendations.

```text
Task Management
       ↓
Risk Detection
       ↓
Project Health Analysis
       ↓
Project Risk Score
       ↓
AI Recommendations
       ↓
Actionable Project Insights
```

---

# ✨ Key Features

## 📋 Kanban Project Management

* Create and manage project boards
* Create, edit and delete tasks
* Organize tasks using Kanban workflow
* Task status management
* Priority management
* Due dates
* Task descriptions

### Task Workflow

```text
TODO
  ↓
IN PROGRESS
  ↓
DONE
```

---

## 🔗 Task Dependencies

Tasks can depend on other tasks.

The system validates dependencies to prevent:

* Self-dependencies
* Cross-board dependencies
* Circular dependencies

Example:

```text
Database Setup
      ↓
Backend API
      ↓
Frontend Integration
      ↓
Testing
```

If an earlier task is incomplete, dependent tasks can be identified as blocked.

---

# 🤖 AI Features

## 1. AI Task Generator

Users can provide a project description and the AI generates realistic development tasks.

### Example

Input:

```text
Build an online food delivery application.
```

Possible generated tasks:

```text
1. Design database schema
2. Implement authentication
3. Create restaurant APIs
4. Implement order management
5. Build frontend pages
6. Add payment integration
7. Perform testing
```

This reduces the time required to manually plan a project.

---

# ❤️ 2. AI Project Health

The platform analyzes the current state of a project and generates a health assessment.

The analysis considers:

* Total tasks
* Completed tasks
* In-progress tasks
* Pending tasks
* Overdue tasks
* High-priority tasks
* Blocked tasks
* Completion percentage

The result includes:

* Health score
* Health status
* Project summary
* Identified risks
* Recommendations

### Health States

```text
🟢 HEALTHY
🟡 WARNING
🔴 CRITICAL
```

The backend calculates reliable project metrics, while AI provides higher-level interpretation and recommendations.

---

# ⚠️ 3. Predictive Risk Detection

The platform identifies tasks that may become risky before they turn into major project blockers.

Risk analysis considers:

* Due date
* Overdue status
* Task priority
* Current task status
* Unfinished dependencies

Each risky task receives a deterministic risk score.

### Example

```text
Task: Payment API

Risk Score: 85
Risk Level: HIGH

Risk Factors:

- Due tomorrow
- High priority
- Task has not started
- Blocked by Database Setup
```

This allows users to focus on the most important problems first.

---

# 📊 4. Project Risk Score

In addition to individual task risk, the system calculates an overall project-level risk score.

The project risk considers signals such as:

* High-risk tasks
* Medium-risk tasks
* Blocked tasks
* Overdue tasks

Example:

```text
PROJECT RISK

Risk Score: 68 / 100
Risk Level: HIGH

High-Risk Tasks: 2
Medium-Risk Tasks: 3
Blocked Tasks: 1
Overdue Tasks: 2
```

This gives users a quick understanding of the overall project condition.

> The project risk calculation is deterministic and consistent. AI is used separately for contextual analysis and recommendations.

---

# 💡 5. AI Recommendations

After identifying risky tasks, the platform uses AI to generate actionable recommendations.

### Example

```text
Risk:

Payment API is blocked by Database Setup.

AI Recommendation:

Complete the database setup before continuing
the Payment API implementation.

Reason:

The Payment API depends on database availability
and may cause additional delays if development
continues without resolving the dependency.
```

This transforms the system from simply **detecting risks** into **helping users decide what to do next**.

---

# 👤 User & Profile Management

The platform includes:

* User registration
* User login
* JWT authentication
* Profile management
* Profile photo upload
* Password change
* User-specific boards

Users can only access their own project data.

---

# 📊 Dashboard

The dashboard provides an overview of project activity.

It includes:

* Total boards
* Total tasks
* Completed tasks
* Pending tasks
* Productivity
* Tasks due today
* Overdue tasks
* Project statistics
* AI Project Health
* AI Early Warnings
* Project Risk Score
* AI Recommendations

---

# 📄 PDF Export

Tasks can be exported as a PDF for sharing or documentation.

This provides a convenient way to create an offline project summary.

---

# 🏗️ Architecture

```text
                    ┌───────────────────────┐
                    │     React Frontend    │
                    │                       │
                    │ Dashboard             │
                    │ Kanban Board          │
                    │ Profile               │
                    │ AI Features           │
                    └───────────┬───────────┘
                                │
                            REST API
                                │
                                ▼
                    ┌───────────────────────┐
                    │ Django REST Framework │
                    │                       │
                    │ Authentication        │
                    │ Board APIs             │
                    │ Task APIs              │
                    │ Dependency Validation  │
                    │ Risk Engine             │
                    │ AI APIs                │
                    └───────────┬───────────┘
                                │
                   ┌────────────┴────────────┐
                   │                         │
                   ▼                         ▼
            ┌─────────────┐           ┌──────────────┐
            │  Database   │           │   Groq AI    │
            │             │           │              │
            │ Users       │           │ Task         │
            │ Boards      │           │ Generation   │
            │ Tasks       │           │ Health       │
            │ Dependencies│           │ Analysis     │
            │ Risk Data   │           │ Recommendations│
            └─────────────┘           └──────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* JavaScript
* Axios
* CSS
* React Icons
* React Toastify
* jsPDF
* jspdf-autotable
* React Circular Progressbar
* Recharts

## Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* Django CORS Headers

## AI

* Groq API
* LLM-based task generation
* LLM-based project health analysis
* LLM-based recommendations

## Database

* Django ORM
* Relational database

## Development Tools

* Git
* GitHub
* VS Code

---

# 🔐 Authentication

The application uses JWT-based authentication.

```text
User
 │
 ▼
Login
 │
 ▼
Django Authentication
 │
 ▼
JWT Access Token
 │
 ▼
React Frontend
 │
 ▼
Authenticated API Requests
```

Protected APIs require authentication.

---

# 🧠 Risk Detection Workflow

The early warning system follows this workflow:

```text
Project Tasks
     │
     ▼
Analyze Task Data
     │
     ├── Due Date
     ├── Priority
     ├── Status
     └── Dependencies
     │
     ▼
Calculate Task Risk
     │
     ▼
Identify Risk Level
     │
     ├── LOW
     ├── MEDIUM
     └── HIGH
     │
     ▼
Calculate Project Risk
     │
     ▼
Generate AI Recommendations
     │
     ▼
Actionable Project Insight
```

The deterministic risk calculation provides consistent scoring, while AI is used for contextual analysis and recommendations.

---

# 📁 Project Structure

```text
ai-powered-kanban/
│
├── backend/
│   ├── config/
│   ├── kanban/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# ⚙️ Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Dikshithab/ai-powered-kanban.git
cd ai-powered-kanban
```

---

## 🐍 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment.

### Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
GROQ_API_KEY=your_groq_api_key
```

Run migrations:

```powershell
python manage.py migrate
```

Start Django:

```powershell
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

---

## ⚛️ Frontend Setup

Open another terminal.

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite.

---

# 🔑 Environment Variables

Never commit real API keys.

Create:

```text
backend/.env
```

with:

```env
GROQ_API_KEY=your_groq_api_key
```

The `.env` file should be excluded from Git using `.gitignore`.

For deployment, configure environment variables through the hosting platform.

---

# 🔒 Security Considerations

The project follows several security practices:

* JWT authentication
* Protected API endpoints
* User-specific board access
* Environment variables for API keys
* Server-side validation
* Dependency validation
* Sensitive credentials excluded from Git

---

# 🧪 Testing Checklist

* [x] User registration
* [x] User login
* [x] Profile update
* [x] Profile photo upload
* [x] Password change
* [x] Board creation
* [x] Board deletion
* [x] Task creation
* [x] Task editing
* [x] Task deletion
* [x] Task dependencies
* [x] Circular dependency validation
* [x] AI Task Generator
* [x] AI Project Health
* [x] AI Early Warnings
* [x] Predictive Risk Detection
* [x] Project Risk Score
* [x] AI Recommendations
* [x] Risk Snapshots
* [x] PDF export
* [x] Dark/Light mode
* [x] Responsive UI

---

# 🎯 Why This Project Is Different

A traditional Kanban application mainly answers:

> **"What tasks do I have?"**

AI-Powered Kanban attempts to answer additional questions:

> **"Is my project healthy?"**

> **"Which tasks are becoming risky?"**

> **"Why are they risky?"**

> **"What should I do next?"**

The main idea is to combine:

**Structured Project Analytics**

*

**Deterministic Risk Detection**

*

**AI-Powered Recommendations**

into a single project-management workflow.

---

# 🚀 Future Improvements

Possible future improvements include:

* Automatic background risk monitoring
* Team collaboration
* Role-based project permissions
* Real-time notifications
* Automated testing
* CI/CD pipeline
* Advanced project analytics
* More sophisticated historical risk analysis

---

# 📌 Project Highlights

```text
React + Django Full Stack
        +
JWT Authentication
        +
Kanban Project Management
        +
Task Dependencies
        +
AI Task Generation
        +
AI Project Health
        +
Predictive Risk Detection
        +
Project Risk Score
        +
AI Recommendations
```

---

# 👩‍💻 Author

**Burra Shiva Dikshitha **

B.Tech Computer Science Engineering — Cyber Security

Interested in:

* Python Full Stack Development
* Artificial Intelligence
* Generative AI
* Backend Development
* Cybersecurity

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is intended for educational, portfolio, and demonstration purposes.
