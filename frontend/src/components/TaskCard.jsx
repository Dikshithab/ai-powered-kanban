import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSave,
  FaClipboardCheck,
  FaCalendarAlt,
  FaFlag,
} from "react-icons/fa";

import "../styles/TaskCard.css";

function TaskCard({ task, onDelete, onUpdate, onEdit }) {
  const [status, setStatus] = useState(task.status);

  const getStatusClass = () => {
    switch (task.status) {
      case "TODO":
        return "badge todo";

      case "IN_PROGRESS":
        return "badge progress";

      default:
        return "badge done";
    }
  };

  const getPriorityClass = () => {
    switch (task.priority) {
      case "HIGH":
        return "priority high";

      case "MEDIUM":
        return "priority medium";

      default:
        return "priority low";
    }
  };
  const getPriorityIcon = () => {
  switch (task.priority) {
    case "HIGH":
      return "🔴";
    case "MEDIUM":
      return "🟡";
    default:
      return "🟢";
  }
};

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

  return (
<div className="task-card" title="Drag me">

      <div className="task-top">

        <span className="priority-dot">
  {getPriorityIcon()}
</span>

<span>{task.priority}</span>

        <span className={getStatusClass()}>
          <FaClipboardCheck />
          {task.status.replace("_", " ")}
        </span>

      </div>

      <h3>{task.title}</h3>

      <p className="description">
        {task.description}
      </p>

     {task.dueDate && (
  <div className="due-date">
    <FaCalendarAlt />
    <span>{formatDate(task.dueDate)}</span>
  </div>
)}

      <select
        className="status-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <div className="task-buttons">

        <button
          className="save-btn"
          onClick={() => onUpdate(task.id, status)}
        >
          <FaSave />
          <span>Save</span>
        </button>

        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
<FaEdit />
<span>Edit</span>
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
<FaTrash />
<span>Delete</span>
        </button>

      </div>

    </div>
  );
}

export default TaskCard;