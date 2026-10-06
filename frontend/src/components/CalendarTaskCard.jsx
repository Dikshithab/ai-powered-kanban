import "../styles/Calendar.css";

function CalendarTaskCard({ task }) {

    const overdue =
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "DONE";

    return (

        <div className={`calendar-task ${task.priority.toLowerCase()}`}>

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p className="due-date">
                📅 {task.dueDate || "No Due Date"}
            </p>

            {overdue && (
                <span className="overdue">
                    ⚠ Overdue
                </span>
            )}

            <div className="calendar-footer">

                <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>

                <span className={`status ${task.status.toLowerCase()}`}>
                    {task.status.replace("_", " ")}
                </span>

            </div>

        </div>

    );
}

export default CalendarTaskCard;