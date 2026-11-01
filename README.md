# 🤖 AI-Powered Kanban

### Predictive Project Management Powered by Artificial Intelligence

An AI-powered project management platform that helps users organize tasks, identify potential project risks, monitor project health, and receive intelligent recommendations before problems become blockers.

Built using **React, Django REST Framework, Python, and Groq AI**.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge&logo=groq&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

---

## 🌐 Live Demo

* **Frontend:** [AI-Powered Kanban](YOUR_RENDER_FRONTEND_URL)
* **Backend:** [Django REST API](https://ai-powered-kanban.onrender.com)
* **GitHub:** [View Source Code](https://github.com/Dikshithab/ai-powered-kanban)

> Replace `YOUR_RENDER_FRONTEND_URL` with your actual Render frontend URL.

---

## 📌 Overview

Traditional Kanban applications help users track tasks, but they generally depend on users noticing project problems themselves.

**AI-Powered Kanban** goes beyond traditional task management by combining Kanban workflows, predictive risk detection, project analytics, and AI-powered recommendations.

The platform identifies:

* Overdue tasks.
* High-priority risks.
* Tasks approaching deadlines.
* Blocked tasks.
* Dependency-related risks.
* Overall project health.
* Recommended actions for risky tasks.

The goal is to move from **reactive task management to predictive project management**.

---

## 🎯 Problem Statement

In conventional project management systems, users often discover problems only after they become serious.

For example:

* A high-priority task may be approaching its deadline.
* A task may be blocked by another unfinished task.
* Several tasks may remain incomplete.
* A project may appear active while actually being at risk.

Manually monitoring these factors becomes difficult as projects grow.

### 💡 Our Solution

The platform combines structured project metrics with AI-powered analysis.

```text
        Task Management
               |
               v
         Risk Detection
               |
               v
      Project Health Analysis
               |
               v
        AI Recommendations
               |
               v
      Actionable Project Insights
```

---

# ✨ Key Features

## 📋 1. Kanban Project Management

* Create and manage project boards.
* Create, edit, and delete tasks.
* Organize tasks using Kanban workflows.
* Manage task statuses and priorities.
* Set task descriptions and due dates.
* Track project progress.

### Task Workflow

```text
       TODO
         |
         v
    IN PROGRESS
         |
         v
        DONE
```

## 🔗 2. Task Dependencies

Tasks can depend on other tasks.

The system validates dependencies to prevent:

* Self-dependencies.
* Cross-board dependencies.
* Circular dependencies.

### Example

```text
Database Setup
      |
      v
Backend API
      |
      v
Frontend Integration
      |
      v
Testing
```

If an earlier task is incomplete, dependent tasks can be identified as blocked.

---

# 🤖 AI-Powered Features

## 3. AI Task Generator

Users can provide a project description, and AI generates relevant development tasks.

**Example input:**

```text
Build an online food delivery application.
```

**Possible generated tasks:**

1. Design database schema.
2. Implement authentication.
3. Create restaurant APIs.
4. Implement order management.
5. Build frontend pages.
6. Add payment integration.
7. Perform application testing.

This reduces the time required to manually plan projects.

## ❤️ 4. AI Project Health Analysis

The platform analyzes the current state of a project and generates a health assessment.

The analysis considers:

* Total tasks.
* Completed tasks.
* In-progress tasks.
* Pending tasks.
* Overdue tasks.
* High-priority tasks.
* Blocked tasks.
* Completion percentage.

### Analysis Results

* Project health score.
* Health status.
* Project summary.
* Identified risks.
* AI-generated recommendations.

### Health States

| Status      | Meaning                                  |
| ----------- | ---------------------------------------- |
| 🟢 HEALTHY  | Project is progressing well.             |
| 🟡 WARNING  | Potential project risks detected.        |
| 🔴 CRITICAL | Serious project risks require attention. |

The backend calculates project metrics, while AI provides contextual interpretation and recommendations.

## ⚠️ 5. Predictive Risk Detection

The platform identifies tasks that may become risky before they turn into major project blockers.

Risk analysis considers:

* Due dates.
* Overdue status.
* Task priority.
* Current task status.
* Unfinished dependencies.

Each risky task receives a calculated risk score.

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

## 💡 6. AI Recommendations

After identifying risky tasks, the platform uses AI to generate actionable recommendations.

### Example

**Identified Risk:**

Payment API is blocked by Database Setup.

**AI Recommendation:**

Complete the database setup before continuing the Payment API implementation.

**Reason:**

The Payment API depends on database availability and may cause additional delays if development continues without resolving the dependency.

This transforms the system from simply detecting risks into helping users decide what to do next.

---

## 👤 7. User & Profile Management

* User registration.
* User login.
* JWT authentication.
* Profile management.
* Profile photo upload.
* Password change.
* User-specific project boards.

Users can only access their own project data through protected APIs.

## 📊 8. Interactive Dashboard

The dashboard provides an overview of project activity.

Features include:

* Total boards.
* Total tasks.
* Completed tasks.
* Pending tasks.
* Productivity statistics.
* Tasks due today.
* Overdue tasks.
* Project statistics.
* AI Project Health.
* AI Early Warnings.

## 📄 9. PDF Export

Users can export tasks as PDF documents for offline access, sharing, and project documentation.

## 🌙 10. Dark & Light Mode

The application supports dark and light themes for a comfortable user experience.

---

# 🏗️ System Architecture

```text
                 React Frontend
                       |
          +------------+------------+
          |            |            |
       Dashboard    Kanban Board   AI Features
          |            |            |
          +------------+------------+
                       |
                    REST API
                       |
                       v
             Django REST Framework
                       |
          +------------+------------+
          |            |            |
    Authentication   Board APIs   Task APIs
          |            |            |
          +------------+------------+
                       |
              +--------+--------+
              |                 |
              v                 v
          Database           Groq AI
              |                 |
          Users             Task Generation
          Boards            Health Analysis
          Tasks             Recommendations
          Dependencies
```

---

# 🧠 AI Risk Detection Workflow

The early warning system follows this workflow:

```text
             Project Tasks
                  |
                  v
            Analyze Task Data
                  |
          +-------+-------+
          |       |       |
       Due Date Priority Status
                  |
                  v
          Check Dependencies
                  |
                  v
          Calculate Risk Score
                  |
                  v
           Identify Risk Level
                  |
          +-------+-------+
          |       |       |
         LOW   MEDIUM    HIGH
                  |
                  v
           AI Recommendations
                  |
                  v
          Actionable Insights
```

The deterministic risk calculation provides consistent scoring, while AI provides contextual analysis and recommendations.

---

# 🛠️ Technology Stack

### Frontend

| Technology                 | Purpose                       |
| -------------------------- | ----------------------------- |
| React                      | User interface                |
| Vite                       | Development and build tool    |
| JavaScript                 | Application logic             |
| Axios                      | API communication             |
| CSS                        | Styling and responsive design |
| React Icons                | Icons                         |
| React Toastify             | Notifications                 |
| jsPDF                      | PDF generation                |
| React Circular Progressbar | Progress visualization        |

### Backend

| Technology            | Purpose               |
| --------------------- | --------------------- |
| Python                | Backend programming   |
| Django                | Backend framework     |
| Django REST Framework | REST API development  |
| Simple JWT            | Authentication        |
| Django CORS Headers   | Cross-origin requests |

### Artificial Intelligence

| Technology                 | Purpose                 |
| -------------------------- | ----------------------- |
| Groq API                   | LLM integration         |
| LLM-based task generation  | Automated task planning |
| AI project health analysis | Project insights        |
| AI recommendations         | Actionable suggestions  |

### Database & Tools

* Django ORM.
* Relational database.
* Git and GitHub.
* VS Code.

### Deployment

* Render – Frontend hosting.
* Render – Backend hosting.

---

# 🔐 Authentication

The application uses JWT-based authentication.

```text
        User
          |
          v
         Login
          |
          v
   Django Authentication
          |
          v
      JWT Tokens
          |
          v
    React Frontend
          |
          v
 Authenticated API Requests
```

Protected API endpoints require valid authentication.

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
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# ⚙️ Local Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Dikshithab/ai-powered-kanban.git

cd ai-powered-kanban
```

## 🐍 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the backend directory:

```env
GROQ_API_KEY=your_groq_api_key
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend URL:

```text
http://127.0.0.1:8000/
```

## ⚛️ 3. Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a frontend `.env` file:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite.

---

# 🔑 Environment Variables

Never commit real API keys or sensitive credentials.

### Backend

Create `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key
```

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

For production, configure the frontend API URL through your hosting platform:

```env
VITE_API_URL=https://ai-powered-kanban.onrender.com/api
```

Make sure environment files containing secrets are excluded from Git.

---

# 🚀 Deployment

The application is deployed using Render.

### Frontend

* React + Vite.
* Render Static Site.
* Build command: `npm install && npm run build`.
* Publish directory: `dist`.

### Backend

* Django REST Framework.
* Render Web Service.
* Gunicorn with Uvicorn worker.
* Production environment variables configured through Render.

### Production API Configuration

The frontend communicates with the Django backend using:

```text
https://ai-powered-kanban.onrender.com/api
```

---

# 🔒 Security Considerations

The project implements several security practices:

* JWT authentication.
* Protected API endpoints.
* User-specific board access.
* Environment variables for API keys.
* Server-side validation.
* Dependency validation.
* Sensitive credentials excluded from Git.

---

# 🧪 Testing Checklist

| Feature              | Status |
| -------------------- | ------ |
| User registration    | ✅      |
| User login           | ✅      |
| Profile update       | ✅      |
| Profile photo upload | ✅      |
| Password change      | ✅      |
| Board creation       | ✅      |
| Board deletion       | ✅      |
| Task creation        | ✅      |
| Task editing         | ✅      |
| Task deletion        | ✅      |
| Task dependencies    | ✅      |
| AI Task Generator    | ✅      |
| AI Project Health    | ✅      |
| AI Early Warnings    | ✅      |
| AI Recommendations   | ✅      |
| PDF Export           | ✅      |
| Dark/Light Mode      | ✅      |
| Responsive UI        | ✅      |

---

# 🎯 Why This Project Is Different

A traditional Kanban application mainly answers:

**"What tasks do I have?"**

AI-Powered Kanban attempts to answer additional questions:

* Is my project healthy?
* Which tasks are becoming risky?
* Why are they risky?
* Which dependencies are blocking progress?
* What should I do next?

The main idea is to combine **structured project analytics, deterministic risk detection, and AI-powered recommendations** into a single project management workflow.

---

# 🔮 Future Improvements

Potential enhancements include:

* Automatic background risk monitoring.
* Historical project health tracking.
* Risk trends and analytics.
* Team collaboration.
* Role-based project permissions.
* Real-time notifications.
* Automated testing.
* CI/CD pipeline.
* Advanced project analytics.

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
AI Project Health Analysis
          +
Predictive Risk Detection
          +
AI Recommendations
```

---

# 👩‍💻 Author

### Shiva Dikshitha Burra

B.Tech – Computer Science Engineering (Cyber Security)

Interested in:

* Python Full Stack Development.
* Artificial Intelligence.
* Generative AI.
* Backend Development.
* Cybersecurity.

**Connect with me:**

* GitHub: [@Dikshithab](https://github.com/Dikshithab)
* LinkedIn: [Shiva Dikshitha Burra](https://www.linkedin.com/in/burra-shiva-dikshitha-353173350/)

---

# ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub!

---

## 📄 License

This project is intended for educational, portfolio, and demonstration purposes.
