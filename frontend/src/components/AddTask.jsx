import { useState } from "react";
import {
  FaTimes,
  FaClipboardList,
  FaAlignLeft,
  FaFlag,
  FaCalendarAlt,
  FaPlus,
} from "react-icons/fa";

import "../styles/AddTask.css";

function AddTask({ boardId, onCreate }) {
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    onCreate({
      title,
      description,
      status: "TODO",
      boardId,
      priority,
      dueDate,
    });

    // Reset state values
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setDueDate("");

    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        className="create-task-btn"
        onClick={() => setShowModal(true)}
      >
        <FaPlus />
        Add Task
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          {/* stopPropagation prevents modal closing when clicking inside the window panel */}
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <h2>Create New Task</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>
                  <FaClipboardList />
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="input-group">
                <label>
                  <FaAlignLeft />
                  Description
                </label>
                <textarea
                  placeholder="Describe your task..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>
                    <FaFlag />
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="LOW">🟢 Low</option>
                    <option value="MEDIUM">🟡 Medium</option>
                    <option value="HIGH">🔴 High</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>
                    <FaCalendarAlt />
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="create-btn">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddTask;