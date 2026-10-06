import { useState } from "react";
import {
  FaTimes,
  FaSave,
  FaEdit,
  FaAlignLeft,
  FaFlag,
  FaCalendarAlt,
  FaClipboardCheck,
} from "react-icons/fa";

import "../styles/EditTask.css";

function EditTask({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status || "TODO");
  const [priority, setPriority] = useState(task.priority || "MEDIUM");
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent native browser form triggers
    onSave({
      ...task,
      title,
      description,
      status,
      priority,
      dueDate,
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      {/* prevent click bubbling out to overlay container layer */}
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={onCancel}
          aria-label="Close modal"
          type="button"
        >
          <FaTimes />
        </button>

        <h2>
          <FaEdit aria-hidden="true" />
          Edit Task
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="task-title">
              <FaEdit aria-hidden="true" /> Task Title
            </label>
            <input
              id="task-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="task-desc">
              <FaAlignLeft aria-hidden="true" /> Description
            </label>
            <textarea
              id="task-desc"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="task-status">
                <FaClipboardCheck aria-hidden="true" /> Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="TODO">📝 TODO</option>
                <option value="IN_PROGRESS">🔄 IN PROGRESS</option>
                <option value="DONE">✅ DONE</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="task-priority">
                <FaFlag aria-hidden="true" /> Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="LOW">🟢 Low</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="HIGH">🔴 High</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="task-date">
              <FaCalendarAlt aria-hidden="true" /> Due Date
            </label>
            <input
              id="task-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              <FaSave aria-hidden="true" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;