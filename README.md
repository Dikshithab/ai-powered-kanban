# 🤖 AI-Powered Kanban

> **An AI-powered predictive project management platform that helps users manage tasks, identify project risks, monitor project health, and receive intelligent recommendations before problems become blockers.**

**React + Django REST Framework + PostgreSQL + Groq AI**

🔗 **Live Demo:** https://ai-powered-kanban-frontend-5zgq3th1j.vercel.app/
🔗 **GitHub:** https://github.com/Dikshithab/ai-powered-kanban

---

## 🚀 Overview

Traditional Kanban applications help users organize and track tasks, but they generally depend on users manually identifying project problems.

**AI-Powered Kanban** goes one step further by combining Kanban project management with predictive project analysis.

The platform analyzes project activity to identify:

* Overdue tasks
* High-priority risks
* Tasks approaching deadlines
* Blocked tasks
* Dependency-related risks
* Overall project health
* Recommended actions for risky tasks

The goal is to move project management from:

**Reactive Task Management → Predictive Project Management**

---

## 🎯 Problem Statement

In traditional project management systems, users may discover problems only after they have already affected the project.

For example:

* A high-priority task may be approaching its deadline.
* A task may be blocked by an unfinished dependency.
* Several important tasks may remain incomplete.
* A project may appear active while actually being at risk.

Manually monitoring all these conditions becomes increasingly difficult as projects grow.

### 💡 Solution

The platform analyzes task and project information and provides:

```text
Task Management
       ↓
Risk Detection
       ↓
Project Health Analysis
       ↓
AI Recommendations
       ↓
Actionable Project Insights
```

This helps users identify potential problems earlier and decide what action to take.

---

# ✨ Key Features

## 📋 Kanban Project Management

* Create and manage project boards
* Create, edit, and delete tasks
* Organize tasks using Kanban workflow
* Task status management
* Priority management
* Due dates
* Task descriptions
* User-specific project data

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
* Circular dependency relationships

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

If an earlier task remains incomplete, dependent tasks can be identified as blocked.

---

# 🤖 AI Features

## 1. AI Task Generator

Users can provide a project description and the AI generates realistic development tasks.

### Example

**Input:**

```text
Build an online food delivery application.
```

**Generated tasks may include:**

```text
1. Design database schema
2. Implement authentication
3. Create restaurant APIs
4. Implement order management
5. Build frontend pages
6. Add payment integration
7. Perform testing
```

This reduces the manual effort required during initial project planning.

---

# ❤️ 2. AI Project Health

The platform analyzes the current state of a project and generates a project health assessment.

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

The backend first calculates reliable project metrics. AI is then used to interpret the project state and provide higher-level insights and recommendations.

---

# ⚠️ 3. Predictive Early Warning System

The **Early Warning System** is one of the core features of the platform.

Instead of waiting until a project problem becomes a blocker, the system identifies tasks that may become risky.

The risk engine considers:

* Due date
* Overdue status
* Task priority
* Current task status
* Unfinished dependencies

A risk score is calculated for each potentially problematic task.

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

This allows users to prioritize the tasks that require immediate attention.

### Important Design Choice

The risk score is calculated using **deterministic backend logic**, providing predictable and explainable results.

AI is used separately for generating contextual recommendations.

---

# 💡 4. AI Recommendations

After risky tasks are detected, the platform uses Groq-powered AI to generate actionable recommendations.

### Example

```text
Risk:
Payment API is blocked by Database Setup.

AI Recommendation:
Complete the database setup before continuing the Payment API implementation.

Reason:
The Payment API depends on database availability and may experience additional delays if development continues before the dependency is resolved.
```

This transforms the platform from simply:

**Detecting Problems**

into:

**Detecting → Explaining → Recommending Actions**

---

# 👤 User & Profile Management

The platform includes:

* User registration
* User login
* JWT authentication
* Profile management
* Profile photo upload
* Password change
* User-specific boards and tasks

Users can only access their authorized project data.

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
* AI Recommendations

---

# 📄 PDF Export

Tasks can be exported as a PDF for project documentation or sharing.

This provides an offline representation of project task information.

---

# 🏗️ System Architecture

```text
                         ┌───────────────────────┐
                         │    React + Vite       │
                         │       Frontend        │
                         │                       │
                         │ Dashboard             │
                         │ Kanban Board          │
                         │ Profile               │
                         │ AI Features           │
                         └───────────┬───────────┘
                                     │
                                  HTTPS
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │   Django REST API     │
                         │                       │
                         │ Authentication        │
                         │ Board APIs            │
                         │ Task APIs             │
                         │ Dependency Validation │
                         │ AI APIs               │
                         └───────┬────────┬──────┘
                                 │        │
                    ┌────────────┘        └─────────────┐
                    ▼                                    ▼
          ┌─────────────────┐                  ┌─────────────────┐
          │   PostgreSQL    │                  │    Groq AI      │
          │                 │                  │                 │
          │ Users           │                  │ Task Generation │
          │ Boards          │                  │ Health Analysis │
          │ Tasks           │                  │ Recommendations │
          │ Dependencies    │                  └─────────────────┘
          └─────────────────┘
```

### Production Deployment

```text
React Frontend
      │
      ▼
   Vercel
      │
      │ HTTPS REST API
      ▼
Django REST API
      │
      ├──────────────► Render
      │
      ├──────────────► Supabase PostgreSQL
      │
      └──────────────► Groq API
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
* React Circular Progressbar
* jsPDF
* jspdf-autotable

## Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* Django CORS Headers
* WhiteNoise
* Gunicorn

## AI

* Groq API
* LLM-based task generation
* LLM-assisted project health analysis
* LLM-generated risk recommendations

## Database

* PostgreSQL
* Django ORM
* Supabase

## Deployment

* Vercel — Frontend
* Render — Backend
* Supabase — PostgreSQL

## Development Tools

* Git
* GitHub
* VS Code
* PowerShell

---

# 🔐 Authentication

The application uses JWT-based authentication.

Authentication flow:

```text
User
 │
 ▼
Login / Register
 │
 ▼
Django Authentication
 │
 ▼
JWT Access + Refresh Tokens
 │
 ▼
React Frontend
 │
 ▼
Authenticated API Requests
```

Axios interceptors automatically attach the access token to authenticated API requests and handle access-token refresh when required.

---

# 🧠 AI & Risk Detection Workflow

The early warning workflow is:

```text
                    Project Tasks
                         │
                         ▼
                  Analyze Task Data
                         │
              ┌──────────┼──────────┐
              │          │          │
          Due Date    Priority    Status
              │          │          │
              └──────────┼──────────┘
                         │
                    Dependencies
                         │
                         ▼
                 Calculate Risk Score
                         │
                         ▼
                  Identify Risk Level
                         │
              ┌──────────┼──────────┐
              │          │          │
             LOW       MEDIUM      HIGH
                         │
                         ▼
                Generate AI Insight
                         │
                         ▼
              Actionable Recommendation
```

The architecture deliberately separates:

**Deterministic Risk Detection**

from

**AI-powered Interpretation and Recommendations**

This makes the risk detection more predictable while still benefiting from generative AI.

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

# 🐍 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

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
SECRET_KEY=your_secret_key
DEBUG=True
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

# ⚛️ Frontend Setup

Open another terminal.

Navigate to:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://127.0.0.1:8000/api/
```

Start the development server:

```powershell
npm run dev
```

Open the URL displayed by Vite.

---

# 🔑 Environment Variables

Never commit real API keys or production credentials.

### Backend

```env
SECRET_KEY=your_secret_key
DEBUG=True
GROQ_API_KEY=your_groq_api_key
```

### Frontend

```env
VITE_API_URL=http://127.0.0.1:8000/api/
```

For production deployment, configure environment variables through the hosting platform.

The `.env` files are excluded from Git using `.gitignore`.

---

# 🔒 Security Considerations

The project implements several security practices:

* JWT authentication
* Protected API endpoints
* User-specific project access
* Environment variables for secrets
* Production CORS restrictions
* Server-side validation
* Dependency validation
* GitHub secret protection
* Sensitive database files excluded from Git

Production credentials and local database dumps are intentionally excluded from the repository.

---

# 🧪 Production Testing Checklist

The deployed application has been tested for:

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
* [x] AI Task Generator
* [x] AI Project Health
* [x] AI Early Warnings
* [x] AI Recommendations
* [x] PDF export
* [x] Dark/Light mode
* [x] Production deployment

---

# 🎯 Why This Project Is Different

A traditional Kanban application mainly answers:

> **"What tasks do I have?"**

AI-Powered Kanban attempts to answer additional questions:

> **"Is my project healthy?"**

> **"Which tasks are becoming risky?"**

> **"Why are they risky?"**

> **"What should I do next?"**

The predictive layer is the primary purpose of integrating AI into the project-management workflow.

---

# 🚀 Future Improvements

Potential improvements include:

* Automatic background risk monitoring
* Historical project health tracking
* Risk trend analytics
* Team collaboration
* Role-based project permissions
* Real-time notifications
* Email or in-app risk alerts
* Automated testing
* CI/CD pipeline
* Advanced project analytics
* AI-powered project planning
* Team productivity insights

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
AI Recommendations
          +
Cloud Deployment
```

---

# 👩‍💻 Author

**Shiva Dikshitha Burra**

B.Tech Computer Science Engineering — Cyber Security

### Interests

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
