# 🤖 AI-Powered Kanban

### Predictive Project Management with AI-Powered Risk Analysis

An intelligent project management platform that helps users organize tasks, detect potential project risks, monitor project health, and receive actionable AI-generated recommendations before problems become major blockers.

Built using **React, Django REST Framework, Python, and Groq AI**.

<p align="center">
  <strong>Plan Smarter • Detect Risks Earlier • Manage Projects Better</strong>
</p>

---

## 🌐 Live Demo

* **Live Application:** [Add your deployed frontend URL]
* **GitHub Repository:** [AI-Powered Kanban](https://github.com/Dikshithab/ai-powered-kanban)

> The application is deployed, and the live demo link can be added here.

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Problem Statement](#-problem-statement)
* [Key Features](#-key-features)
* [How the Risk Engine Works](#-how-the-risk-engine-works)
* [AI Integration](#-ai-integration)
* [System Architecture](#-system-architecture)
* [Technology Stack](#️-technology-stack)
* [Authentication and Security](#-authentication-and-security)
* [Project Structure](#-project-structure)
* [Installation and Setup](#-installation-and-setup)
* [Environment Variables](#-environment-variables)
* [Testing](#-testing)
* [Future Enhancements](#-future-enhancements)
* [What Makes This Project Different](#-what-makes-this-project-different)
* [Author](#-author)

---

## 🚀 Overview

Traditional Kanban applications help users organize tasks and track project progress. However, identifying potential delays, blocked tasks, and project risks often requires manual monitoring.

**AI-Powered Kanban extends traditional task management with predictive risk detection and AI-assisted decision support.**

The application combines structured project data, deterministic risk calculations, dependency validation, project health analytics, and large language model (LLM) capabilities.

It helps users answer important questions:

* Which tasks need immediate attention?
* Which tasks are overdue or approaching their deadlines?
* Are unfinished dependencies blocking progress?
* How healthy is the overall project?
* What actions could reduce project risk?
* How can a project description be converted into actionable tasks?

The objective is to move from reactive task tracking toward more proactive, data-driven project management.

---

## 🎯 Problem Statement

As projects become more complex, manually tracking deadlines, dependencies, priorities, and completion status becomes increasingly difficult.

Potential problems include:

* High-priority tasks approaching their deadlines.
* Tasks remaining incomplete beyond their due dates.
* Dependent tasks being blocked by unfinished work.
* Multiple risky tasks affecting the same project.
* Project delays going unnoticed until they become serious.
* Time spent manually breaking project requirements into smaller tasks.

### 💡 Proposed Solution

AI-Powered Kanban combines task management, automated risk analysis, project health metrics, and AI-generated recommendations in one platform.

```text
        Project & Task Management
                  |
                  v
          Task Data Analysis
                  |
                  v
          Dependency Checking
                  |
                  v
          Deterministic Risk Engine
                  |
                  v
         Project Health Analysis
                  |
                  v
          Project Risk Assessment
                  |
                  v
          AI Recommendations
                  |
                  v
           Actionable Insights
```

The risk engine calculates structured metrics, while AI helps interpret project context and suggest possible next steps.

---

## ✨ Key Features

### 1. 📋 Kanban Project Management

Organize projects using a structured Kanban workflow.

Features include:

* Create and manage project boards.
* Create, edit, and delete tasks.
* Update task statuses.
* Assign task priorities.
* Set due dates and task descriptions.
* Track project progress.
* View tasks through a visual Kanban interface.

#### Task Workflow

```text
┌────────────┐
│    TODO    │
└─────┬──────┘
      |
      v
┌────────────┐
│ IN PROGRESS│
└─────┬──────┘
      |
      v
┌────────────┐
│    DONE    │
└────────────┘
```

### 2. 🔗 Task Dependency Management

Tasks can depend on other tasks, allowing the application to identify work that cannot proceed until prerequisite tasks are completed.

Dependency validation helps prevent:

* Self-dependencies.
* Dependencies between tasks belonging to different boards.
* Circular dependency chains.

#### Example

```text
Database Setup
      |
      v
Backend API Development
      |
      v
Frontend Integration
      |
      v
Testing & Deployment
```

If a prerequisite remains incomplete, the system can identify dependent tasks as blocked.

This makes dependencies useful not only for planning but also for project risk analysis.

### 3. 🤖 AI Task Generator

Convert a project description into a proposed list of development tasks.

**Example input:**

```text
Build an online food delivery application.
```

**Example output:**

```text
1. Define application requirements.
2. Design the database schema.
3. Implement user authentication.
4. Develop restaurant management APIs.
5. Implement order management.
6. Integrate payment processing.
7. Build the frontend interface.
8. Test application workflows.
```

The generated tasks provide a starting point for project planning. Users should review the output before incorporating it into their project.

### 4. ❤️ AI Project Health Analysis

Evaluate project progress using task metrics and AI-assisted interpretation.

The analysis considers information such as:

* Total tasks.
* Completed tasks.
* In-progress tasks.
* Pending tasks.
* Overdue tasks.
* High-priority tasks.
* Blocked tasks.
* Completion percentage.

The health assessment can provide:

* A project health score.
* A health status.
* A project summary.
* Identified concerns.
* Suggested corrective actions.

#### Example Health States

| Status      | Meaning                                              |
| ----------- | ---------------------------------------------------- |
| 🟢 Healthy  | Project metrics indicate relatively stable progress. |
| 🟡 Warning  | One or more concerns require attention.              |
| 🔴 Critical | Significant risks require prompt review.             |

The actual status depends on the application's implemented scoring rules.

**Important design principle:** Project metrics should be calculated by the backend. AI-generated interpretations and recommendations should supplement those metrics rather than replace the underlying calculations.

### 5. ⚠️ Predictive Task Risk Detection

The risk engine evaluates task attributes to identify work that may require attention.

Risk signals include:

* Due dates and overdue status.
* Task priority.
* Current task status.
* Unfinished dependencies.

Each task receives a risk score and a corresponding risk level according to the implemented backend rules.

#### Illustrative Example

```text
TASK: Payment API

Risk Score: 85 / 100
Risk Level: HIGH

Potential Risk Factors:
- Approaching deadline.
- High task priority.
- Work has not started.
- Dependent database task remains incomplete.
```

*The values above are illustrative, not a live calculation from the application.*

By identifying contributing risk factors, the application helps users understand why a task may need attention.

### 6. 📊 Project-Level Risk Assessment

Individual task risks can affect the condition of an entire project.

The project-level risk assessment summarizes relevant signals, including:

* High-risk tasks.
* Medium-risk tasks.
* Blocked tasks.
* Overdue tasks.

#### Illustrative Example

```text
PROJECT RISK SUMMARY

Risk Score: 68 / 100
Risk Level: HIGH

High-Risk Tasks:   2
Medium-Risk Tasks: 3
Blocked Tasks:     1
Overdue Tasks:     2
```

The overall risk score is calculated using the application's deterministic backend logic.

This provides a consistent project-level view without relying on an LLM to invent numerical scores.

### 7. 💡 AI-Powered Recommendations

After identifying potential problems, the application uses AI to generate contextual recommendations.

#### Example

**Identified risk:**

The Payment API task depends on Database Setup, which remains incomplete.

**Possible recommendation:**

Prioritize the database setup, verify that the required schema and database access are available, and then continue with Payment API integration.

**Reasoning:**

The unfinished dependency may prevent the dependent task from progressing and could contribute to additional delays.

Recommendations should be treated as decision-support suggestions. Users remain responsible for validating them against actual project requirements.

### 8. 📊 Interactive Dashboard

The dashboard provides an overview of project activity and potential risks.

Depending on the selected project and available data, it includes:

* Total boards.
* Total tasks.
* Completed and pending tasks.
* Productivity statistics.
* Tasks due today.
* Overdue tasks.
* Project statistics and charts.
* Project health analysis.
* Early risk warnings.
* Project risk scores.
* AI-generated recommendations.

### 9. 👤 User and Profile Management

The application includes account and profile functionality.

* User registration.
* User login.
* JWT-based authentication.
* Profile management.
* Profile photo uploads.
* Password changes.
* User-specific project boards.

Protected API endpoints enforce access controls so users cannot access other users' project data.

### 10. 📄 PDF Export

Export task information into a PDF document for offline reference, reporting, or sharing.

The export functionality provides a convenient way to retain a project task summary outside the application.

### 11. 🌙 Dark and Light Themes

Switch between dark and light themes to customize the interface.

### 12. 📱 Responsive Interface

The React frontend is designed to provide a usable experience across supported desktop and smaller screen sizes.

---

## 🧠 How the Risk Engine Works

The risk engine and AI components serve different purposes.

### Step 1: Collect Task Information

The backend retrieves the relevant task data, including status, priority, due date, and dependency information.

### Step 2: Validate Dependencies

The application checks dependency relationships and identifies tasks waiting on unfinished prerequisites.

### Step 3: Calculate Task Risk

The backend applies its deterministic scoring rules to evaluate task risk.

Conceptually:

```text
Task Information
       |
       +---- Due Date
       |
       +---- Priority
       |
       +---- Task Status
       |
       +---- Dependencies
       |
       v
Deterministic Risk Calculation
       |
       v
Task Risk Score and Risk Level
```

The actual weights, thresholds, and formulas depend on the implementation.

### Step 4: Calculate Project Risk

Relevant task-level signals are aggregated using the backend's project-level risk calculation.

### Step 5: Assess Project Health

Project statistics are evaluated to provide a structured picture of progress and potential concerns.

### Step 6: Generate Recommendations

The application can pass relevant project context to the AI service to generate explanations and suggested actions.

```text
Task Metrics
     |
     v
Risk Engine
     |
     v
Project Risk Summary
     |
     v
AI Contextual Analysis
     |
     v
Suggested Corrective Actions
```

**Why this separation matters:** Deterministic calculations make risk scores more consistent and explainable. AI adds flexibility when interpreting context and generating recommendations.

---

## 🏗️ System Architecture

```text
                  React Frontend
                        |
                        v
                    REST API
                        |
                        v
              Django REST Framework
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
    Authentication  Task & Board   Risk Engine
          |          Management         |
          |             |               |
          +-------------+---------------+
                        |
                        v
                  Django ORM
                        |
                        v
                    Database

              Django REST Framework
                        |
                        v
                    Groq API
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
      Task          Health        Suggested
    Generation     Analysis       Actions
```

### Architecture Responsibilities

| Component             | Responsibility                                                    |
| --------------------- | ----------------------------------------------------------------- |
| React                 | User interface, dashboard, and Kanban interactions.               |
| Django REST Framework | API endpoints, authentication, validation, and business logic.    |
| Django ORM            | Database access and model operations.                             |
| Database              | Persistent storage for users, boards, tasks, and related records. |
| Risk Engine           | Deterministic task and project risk calculations.                 |
| Groq API              | LLM-powered task generation and AI-assisted analysis.             |

---

## 🛠️ Technology Stack

### Frontend

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

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* Django CORS Headers

### Artificial Intelligence

* Groq API
* Large language models (LLMs)
* AI task generation
* AI-assisted project health analysis
* Contextual recommendations

### Database

* Django ORM
* Relational database

### Development and Deployment

* Git
* GitHub
* Visual Studio Code
* Vite-based frontend deployment
* Backend hosting configured for the deployed application

---

## 🔐 Authentication and Security

The application uses JWT-based authentication to protect API requests.

### Authentication Workflow

```text
User Registration / Login
           |
           v
Django Authentication
           |
           v
JWT Token Issued
           |
           v
React Stores Authentication State
           |
           v
Authenticated API Requests
           |
           v
Backend Permission Checks
           |
           v
Authorized Resource Access
```

Security-related implementation areas include:

* JWT authentication.
* Protected API endpoints.
* User-specific board access.
* Server-side input validation.
* Dependency validation.
* Environment-based API key configuration.
* Exclusion of sensitive credentials from Git.

Security depends on the actual backend configuration and access-control implementation; these practices should be verified before describing the application as production-secure.

---

## 📁 Project Structure

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
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

*This is a simplified overview. The exact files and folders may differ from the current repository.*

---

## ⚙️ Installation and Setup

Follow these instructions to run the project locally.

### Prerequisites

Install the following:

* Python 3.11 or another version supported by the project dependencies.
* Node.js and npm.
* Git.
* A Groq API key for AI functionality.

### 1. Clone the Repository

```bash
git clone https://github.com/Dikshithab/ai-powered-kanban.git
cd ai-powered-kanban
```

### 2. Set Up the Backend

Navigate to the backend directory:

```powershell
cd backend
```

Create a Python virtual environment:

```powershell
python -m venv venv
```

Activate it on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks script execution, you can activate the environment using Command Prompt instead:

```bat
venv\Scripts\activate.bat
```

Install the required dependencies:

```powershell
python -m pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
GROQ_API_KEY=your_groq_api_key
```

Ensure the Django settings load this file and that the application reads the API key from the environment.

Do not commit your actual API key.

### 4. Run Database Migrations

```powershell
python manage.py migrate
```

### 5. Start the Backend Server

```powershell
python manage.py runserver
```

The local Django development server runs at:

```text
http://127.0.0.1:8000/
```

### 6. Set Up the Frontend

Open a second terminal and navigate to the frontend directory from the repository root:

```powershell
cd frontend
```

Install frontend dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open the local URL displayed in the terminal.

> **Configuration note:** If the frontend requires a backend API URL, configure it using the environment variable expected by your existing frontend code. The exact variable name depends on the implementation.

---

## 🔑 Environment Variables

The backend uses an environment variable for the Groq API key.

Example:

```env
GROQ_API_KEY=your_groq_api_key
```

Keep real credentials out of source control.

Recommended practices:

* Store secrets in environment variables.
* Exclude `.env` files from Git.
* Configure production secrets through the hosting provider.
* Never expose the Groq API key in frontend code.
* Rotate any API key accidentally committed to a public repository.

---

## 🧪 Testing Checklist

Use this checklist to track verified functionality. Mark an item as complete only after testing it.

### Authentication and Profile

* [ ] User registration.
* [ ] User login.
* [ ] Profile update.
* [ ] Profile photo upload.
* [ ] Password change.
* [ ] Protected API access.

### Project and Task Management

* [ ] Board creation and deletion.
* [ ] Task creation, editing, and deletion.
* [ ] Task status updates.
* [ ] Priority and due-date handling.
* [ ] User-specific board access.

### Dependencies and Risk Analysis

* [ ] Self-dependency validation.
* [ ] Cross-board dependency validation.
* [ ] Circular dependency validation.
* [ ] Blocked-task detection.
* [ ] Task risk scoring.
* [ ] Project risk calculation.
* [ ] Project health analysis.
* [ ] Risk snapshot handling.

### AI and User Interface

* [ ] AI task generation.
* [ ] AI project health analysis.
* [ ] AI recommendations.
* [ ] Dashboard statistics.
* [ ] PDF export.
* [ ] Dark and light themes.
* [ ] Responsive interface.

---

## 🚀 Future Enhancements

Potential improvements include:

* **Automated risk monitoring:** Periodically evaluate projects for emerging risks.
* **Real-time notifications:** Notify users about overdue tasks and critical blockers.
* **Team collaboration:** Enable multiple users to collaborate on shared boards.
* **Role-based permissions:** Introduce project owner, manager, and member roles.
* **Historical risk analytics:** Track how project risk changes over time.
* **Risk trend visualization:** Display risk history through interactive charts.
* **Automated testing:** Add backend unit tests and frontend integration tests.
* **CI/CD pipeline:** Automate testing and deployment.
* **Enhanced explainability:** Show which factors contributed to each risk score.
* **Recommendation tracking:** Allow users to record whether recommended actions resolved identified risks.

---

## 🌟 What Makes This Project Different?

Traditional Kanban tools primarily help users answer:

> What tasks need to be completed?

AI-Powered Kanban aims to answer additional questions:

> How healthy is the project?

> Which tasks require attention first?

> What factors are contributing to project risk?

> Which dependencies may block progress?

> What actions could help reduce potential delays?

The central idea is the combination of three capabilities:

**1. Structured Project Analytics**

Measure progress using task and project data.

**2. Deterministic Risk Detection**

Calculate consistent risk scores from predefined rules and measurable task attributes.

**3. AI-Powered Decision Support**

Use an LLM to generate project tasks, interpret relevant context, and suggest possible next steps.

Together, these capabilities create a project management workflow that goes beyond simply recording task status.

---

## 👩‍💻 Author

**Burra Shiva Dikshitha**

B.Tech — Computer Science Engineering, Cyber Security

Interested in:

* Python Full-Stack Development
* Artificial Intelligence
* Generative AI
* Backend Development
* Cybersecurity

### Connect

* **GitHub:** [Dikshithab](https://github.com/Dikshithab)
* **LinkedIn:** [Shiva Dikshitha Burra](https://www.linkedin.com/in/burra-shiva-dikshitha-353173350/)

---

## ⭐ Support

If you find this project useful, consider giving the repository a star on GitHub.

---

## 📄 License

This project is intended for educational, portfolio, and demonstration purposes.

Add a license file to the repository if you want to distribute the project under a specific open-source license.
