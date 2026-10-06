import React, { useState } from "react";
import api from "../api/axios";
import "../styles/AITaskBreakdown.css";

function AITaskBreakdown({ boardId, onTasksCreated }) {
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const generateTasks = async () => {
    if (!description.trim()) {
      setError("Please describe your project first.");
      return;
    }

    setLoading(true);
    setError("");
    setTasks([]);
    setSelectedTasks([]);

    try {
      const response = await api.post("/ai/generate-tasks/", {
        project_description: description,
      });

      const generatedTasks = response.data.tasks || [];

      const formattedTasks = generatedTasks.map((task) => ({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "MEDIUM",
      }));

      setTasks(formattedTasks);
      setSelectedTasks(
        formattedTasks.map((_, index) => index)
      );
    } catch (err) {
      console.error("AI generation failed:", err);

      setError(
        err.response?.data?.message ||
          "Failed to generate tasks. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (index) => {
    setSelectedTasks((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  const updateTask = (index, field, value) => {
    setTasks((current) =>
      current.map((task, taskIndex) =>
        taskIndex === index
          ? {
              ...task,
              [field]: value,
            }
          : task
      )
    );
  };

  const removeTask = (index) => {
    setTasks((current) =>
      current.filter((_, taskIndex) => taskIndex !== index)
    );

    setSelectedTasks((current) =>
      current
        .filter((taskIndex) => taskIndex !== index)
        .map((taskIndex) =>
          taskIndex > index ? taskIndex - 1 : taskIndex
        )
    );
  };

  const createTasks = async () => {
    if (selectedTasks.length === 0) {
      setError("Please select at least one task.");
      return;
    }

    setCreating(true);
    setError("");

    try {
      for (const index of selectedTasks) {
        const task = tasks[index];

        await api.post("/tasks/", {
          board_id: boardId,
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: "TODO",
        });
      }

      setDescription("");
      setTasks([]);
      setSelectedTasks([]);

      if (onTasksCreated) {
        await onTasksCreated();
      }
    } catch (err) {
      console.error("Creating AI tasks failed:", err);

      setError(
        err.response?.data?.message ||
          "Failed to create tasks."
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="ai-task-breakdown">
      <div className="ai-task-header">
        <h2>✨ AI Task Breakdown</h2>

        <p>
          Describe your project and let AI break it into
          actionable Kanban tasks.
        </p>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Example: Build an e-commerce website with authentication, products, cart, payments and an admin dashboard..."
        rows={5}
        disabled={loading}
      />

      <button
        type="button"
        onClick={generateTasks}
        disabled={loading}
      >
        {loading ? "✨ Generating..." : "✨ Generate Tasks"}
      </button>

      {error && (
        <p className="ai-error">
          {error}
        </p>
      )}

      {tasks.length > 0 && (
        <div className="ai-generated-tasks">

          <div className="ai-results-header">
            <div>
              <h3>Generated Tasks</h3>
              <span>
                Review and edit the AI suggestions before
                adding them to your board.
              </span>
            </div>

            <span>
              {selectedTasks.length} selected
            </span>
          </div>

          {tasks.map((task, index) => (
            <div
              key={index}
              className={`ai-task-item ${
                selectedTasks.includes(index)
                  ? "selected"
                  : ""
              }`}
            >
              <div className="ai-task-top">

                <label className="ai-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(index)}
                    onChange={() => toggleTask(index)}
                  />
                </label>

                <div className="ai-task-fields">

                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) =>
                      updateTask(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Task title"
                    className="ai-task-title-input"
                  />

                  <textarea
                    value={task.description}
                    onChange={(e) =>
                      updateTask(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Task description"
                    rows={3}
                    className="ai-task-description-input"
                  />

                  <div className="ai-task-actions">

                    <select
                      value={task.priority}
                      onChange={(e) =>
                        updateTask(
                          index,
                          "priority",
                          e.target.value
                        )
                      }
                    >
                      <option value="LOW">
                        🟢 Low
                      </option>

                      <option value="MEDIUM">
                        🟡 Medium
                      </option>

                      <option value="HIGH">
                        🔴 High
                      </option>
                    </select>

                    <button
                      type="button"
                      className="ai-remove-button"
                      onClick={() => removeTask(index)}
                    >
                      🗑️ Remove
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={createTasks}
            disabled={creating}
          >
            {creating
              ? "Creating Tasks..."
              : "🚀 Create Selected Tasks"}
          </button>

        </div>
      )}
    </div>
  );
}

export default AITaskBreakdown;