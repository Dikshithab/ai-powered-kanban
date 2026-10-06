import os
import json

from dotenv import load_dotenv
from groq import Groq
from datetime import date



# Load environment variables from .env
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not configured")


client = Groq(api_key=GROQ_API_KEY)


def generate_tasks(project_description):
    """
    Generate a structured list of project tasks using Groq AI.
    """

    prompt = f"""
You are an experienced software project manager.

Break the following project into practical development tasks.

PROJECT:
{project_description}

Return ONLY valid JSON.

The JSON must have exactly this structure:

{{
    "tasks": [
        {{
            "title": "Task title",
            "description": "Short task description",
            "priority": "LOW"
        }}
    ]
}}

Rules:

1. Generate between 5 and 10 tasks.
2. Tasks must be realistic and actionable.
3. Order tasks logically from beginning to completion.
4. Priority must be exactly one of:
   LOW
   MEDIUM
   HIGH
5. Do not include markdown.
6. Do not include explanations outside the JSON.
"""

    response = client.chat.completions.create(
            model="openai/gpt-oss-120b",        
            messages=[
            {
                "role": "system",
                "content": "You are a professional software project manager."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=2000,
    )

    content = response.choices[0].message.content.strip()

    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        raise ValueError("AI returned invalid JSON")

    if not isinstance(data, dict) or "tasks" not in data:
        raise ValueError("AI response does not contain tasks")

    return data["tasks"]


def analyze_project_health(tasks):
    """
    Hybrid AI Project Health Engine.

    1. Calculates objective project metrics.
    2. Detects deadline, priority and dependency risks.
    3. Sends the calculated context to Groq AI.
    4. Returns an AI-generated project health analysis.
    """

    task_list = list(tasks)

    total_tasks = len(task_list)

    completed_tasks = [
        task for task in task_list
        if task.status == "DONE"
    ]

    in_progress_tasks = [
        task for task in task_list
        if task.status == "IN_PROGRESS"
    ]

    todo_tasks = [
        task for task in task_list
        if task.status == "TODO"
    ]

    today = date.today()

    overdue_tasks = [
        task for task in task_list
        if task.due_date
        and task.due_date < today
        and task.status != "DONE"
    ]

    high_priority_pending = [
        task for task in task_list
        if task.priority == "HIGH"
        and task.status != "DONE"
    ]

    # Dependency analysis
    blocked_tasks = []

    for task in task_list:

        dependencies = task.dependencies.all()

        for dependency in dependencies:

            if dependency.status != "DONE":
                blocked_tasks.append(task)
                break

    # Calculate completion percentage
    completion_percentage = round(
        (len(completed_tasks) / total_tasks) * 100
    ) if total_tasks else 0

    # Calculate risk percentages
    overdue_percentage = round(
        (len(overdue_tasks) / total_tasks) * 100
    ) if total_tasks else 0

    blocked_percentage = round(
        (len(blocked_tasks) / total_tasks) * 100
    ) if total_tasks else 0

    high_priority_percentage = round(
        (len(high_priority_pending) / total_tasks) * 100
    ) if total_tasks else 0

    # --------------------------------------------------
    # Build task information for AI
    # --------------------------------------------------

    task_data = []

    for task in task_list:

        dependencies = list(
            task.dependencies.values_list(
                "title",
                flat=True
            )
        )

        task_data.append({
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "priority": task.priority,
            "due_date": (
                str(task.due_date)
                if task.due_date
                else None
            ),
            "dependencies": dependencies,
        })

    metrics = {
        "total_tasks": total_tasks,
        "completed_tasks": len(completed_tasks),
        "in_progress_tasks": len(in_progress_tasks),
        "todo_tasks": len(todo_tasks),
        "completion_percentage": completion_percentage,
        "overdue_tasks": len(overdue_tasks),
        "overdue_percentage": overdue_percentage,
        "high_priority_pending": len(high_priority_pending),
        "high_priority_percentage": high_priority_percentage,
        "blocked_tasks": len(blocked_tasks),
        "blocked_percentage": blocked_percentage,
    }

    prompt = f"""
You are an expert software project manager.

Analyze the health of this Kanban project using the
REAL calculated project metrics and task information.

PROJECT METRICS:
{json.dumps(metrics, indent=2)}

TASKS:
{json.dumps(task_data, indent=2)}

IMPORTANT:

The metrics above were calculated by the backend.
Do NOT invent or change these numbers.

Return ONLY valid JSON.

Use exactly this structure:

{{
    "health_score": 0,
    "health_status": "HEALTHY",
    "summary": "Short project health summary",

    "metrics": {{
        "total_tasks": 0,
        "completed_tasks": 0,
        "in_progress_tasks": 0,
        "todo_tasks": 0,
        "completion_percentage": 0,
        "overdue_tasks": 0,
        "overdue_percentage": 0,
        "high_priority_pending": 0,
        "blocked_tasks": 0
    }},

    "risks": [
        {{
            "title": "Risk title",
            "description": "Why this is a risk",
            "severity": "LOW"
        }}
    ],

    "recommendations": [
        "Recommendation 1",
        "Recommendation 2"
    ]
}}

RULES:

1. health_score must be between 0 and 100.

2. health_status must be exactly one of:
   HEALTHY
   WARNING
   CRITICAL

3. severity must be exactly one of:
   LOW
   MEDIUM
   HIGH

4. Use the backend metrics as the source of truth.

5. Identify overdue tasks as deadline risks.

6. Identify unfinished HIGH priority tasks as priority risks.

7. Identify blocked tasks as dependency risks.

8. Give practical recommendations based on the actual
   project state.

9. Do not invent tasks.

10. Return ONLY JSON.

BACKEND METRICS:
{json.dumps(metrics, indent=2)}
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert software project manager "
                    "specialized in project risk analysis."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
        max_tokens=2500,
    )

    content = response.choices[0].message.content.strip()

    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        raise ValueError("AI returned invalid JSON")

    if not isinstance(data, dict):
        raise ValueError("Invalid AI response")

    # --------------------------------------------------
    # Add reliable backend metrics
    # --------------------------------------------------

    data["metrics"] = {
        "total_tasks": total_tasks,
        "completed_tasks": len(completed_tasks),
        "in_progress_tasks": len(in_progress_tasks),
        "todo_tasks": len(todo_tasks),
        "completion_percentage": completion_percentage,
        "overdue_tasks": len(overdue_tasks),
        "overdue_percentage": overdue_percentage,
        "high_priority_pending": len(high_priority_pending),
        "blocked_tasks": len(blocked_tasks),
    }

    return data
def detect_early_warnings(tasks):
    """
    Detect tasks that are at risk of missing their deadlines.
    Uses deterministic backend rules first.
    """

    today = date.today()
    warnings = []

    for task in tasks:

        # Completed tasks don't need warnings
        if task.status == "DONE":
            continue

        risk_factors = []
        risk_score = 0

        # -----------------------------
        # 1. Due date analysis
        # -----------------------------

        days_remaining = None

        if task.due_date:
            days_remaining = (task.due_date - today).days

            if days_remaining < 0:
                risk_score += 40
                risk_factors.append(
                    f"Overdue by {abs(days_remaining)} day(s)"
                )

            elif days_remaining == 0:
                risk_score += 35
                risk_factors.append(
                    "Due today"
                )

            elif days_remaining <= 2:
                risk_score += 25
                risk_factors.append(
                    f"Due in {days_remaining} day(s)"
                )

            elif days_remaining <= 5:
                risk_score += 10
                risk_factors.append(
                    f"Due in {days_remaining} day(s)"
                )

        # -----------------------------
        # 2. Priority analysis
        # -----------------------------

        if task.priority == "HIGH":
            risk_score += 20
            risk_factors.append("High priority task")

        elif task.priority == "MEDIUM":
            risk_score += 5

        # -----------------------------
        # 3. Status analysis
        # -----------------------------

        if task.status == "TODO":
            risk_score += 10
            risk_factors.append("Task has not started")

        elif task.status == "IN_PROGRESS":
            risk_score += 5

        # -----------------------------
        # 4. Dependency analysis
        # -----------------------------

        blocked_dependencies = []

        for dependency in task.dependencies.all():

            if dependency.status != "DONE":
                blocked_dependencies.append(dependency.title)

        if blocked_dependencies:
            risk_score += 25

            risk_factors.append(
                f"Blocked by {len(blocked_dependencies)} unfinished "
                f"dependency/dependencies"
            )

        # -----------------------------
        # Determine risk level
        # -----------------------------

        if risk_score >= 60:
            risk_level = "HIGH"

        elif risk_score >= 35:
            risk_level = "MEDIUM"

        else:
            risk_level = "LOW"

        # Only show actual warnings
        if risk_score >= 35:

            warnings.append({
                "task_id": task.id,
                "title": task.title,
                "status": task.status,
                "priority": task.priority,
                "due_date": (
                    task.due_date.isoformat()
                    if task.due_date
                    else None
                ),
                "days_remaining": days_remaining,
                "risk_score": min(risk_score, 100),
                "risk_level": risk_level,
                "risk_factors": risk_factors,
                "blocked_by": blocked_dependencies,
            })

    # Highest-risk tasks first
    warnings.sort(
        key=lambda warning: warning["risk_score"],
        reverse=True
    )

    return warnings
def generate_warning_recommendations(warnings):
    """
    Use AI to generate practical recommendations
    for tasks identified as high-risk.
    """

    if not warnings:
        return []

    warning_data = []

    for warning in warnings:
        warning_data.append({
            "task_id": warning["task_id"],
            "title": warning["title"],
            "priority": warning["priority"],
            "status": warning["status"],
            "due_date": warning["due_date"],
            "days_remaining": warning["days_remaining"],
            "risk_score": warning["risk_score"],
            "risk_level": warning["risk_level"],
            "risk_factors": warning["risk_factors"],
            "blocked_by": warning["blocked_by"],
        })

    prompt = f"""
You are an experienced software project manager.

Analyze these risky project tasks:

{json.dumps(warning_data, indent=2)}

For each task, provide a practical recommendation that
a developer or project manager can immediately act on.

Return ONLY valid JSON.

Required structure:

{{
    "recommendations": [
        {{
            "task_id": 1,
            "recommendation": "Clear actionable recommendation",
            "reason": "Short explanation"
        }}
    ]
}}

Rules:

1. Include every task.
2. Recommendations must be specific.
3. Prioritize blocking dependencies.
4. Consider deadlines and priority.
5. Do not give generic advice.
6. Do not include markdown.
7. Return valid JSON only.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert software project manager "
                    "specializing in project risk management."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
        max_tokens=2500,
    )

    content = response.choices[0].message.content.strip()

    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        raise ValueError(
            "AI returned invalid recommendation JSON"
        )

    if not isinstance(data, dict):
        raise ValueError(
            "AI recommendation response is invalid"
        )

    return data.get("recommendations", [])
