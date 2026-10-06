import React, { useState } from "react";
import api from "../api/axios";
import "../styles/AIProjectHealth.css";

function AIProjectHealth({ boardId }) {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeProject = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/ai/project-health/", {
        board_id: boardId,
      });

      setHealth(response.data);
    } catch (err) {
      console.error("Project health analysis failed:", err);

      setError(
        err.response?.data?.message ||
          "Failed to analyze project health."
      );
    } finally {
      setLoading(false);
    }
  };

  const getHealthClass = () => {
    if (!health) return "";

    return health.health_status
      ?.toLowerCase()
      .replace(" ", "-");
  };

  return (
    <div className="ai-project-health">

      <div className="health-header">
        <div>
          <h2>🧠 AI Project Health</h2>

          <p>
            Let AI analyze your tasks, risks and project progress.
          </p>
        </div>

        <button
          className="analyze-health-btn"
          onClick={analyzeProject}
          disabled={loading}
        >
          {loading
            ? "✨ Analyzing..."
            : "✨ Analyze Project"}
        </button>
      </div>

      {error && (
        <div className="health-error">
          {error}
        </div>
      )}

      {health && (
        <div className="health-results">

          {/* Health Score */}

          <div className="health-score-card">

            <div className="health-score">
              {health.health_score}
              <span>%</span>
            </div>

            <div
              className={`health-status ${getHealthClass()}`}
            >
              {health.health_status}
            </div>

            <p>Project Health</p>

          </div>

          {/* Summary */}

          <div className="health-summary">

            <h3>📊 Project Summary</h3>

            <p>
              {health.summary}
            </p>

          </div>

          {/* Risks */}

          <div className="health-section">

            <div className="section-title">
              <h3>⚠️ Project Risks</h3>

              <span>
                {health.risks?.length || 0}
              </span>
            </div>

            {health.risks?.length > 0 ? (
              <div className="risk-list">

                {health.risks.map((risk, index) => (
                  <div
                    className="risk-item"
                    key={index}
                  >

                    <div className="risk-content">

                      <strong>
                        {risk.title}
                      </strong>

                      <p>
                        {risk.description}
                      </p>

                    </div>

                    <span
                      className={`risk-severity ${String(
                        risk.severity
                      ).toLowerCase()}`}
                    >
                      {risk.severity}
                    </span>

                  </div>
                ))}

              </div>
            ) : (
              <p className="empty-health">
                🎉 No major risks detected.
              </p>
            )}

          </div>

          {/* Recommendations */}

          <div className="health-section">

            <div className="section-title">
              <h3>💡 AI Recommendations</h3>
            </div>

            {health.recommendations?.length > 0 ? (
              <ul className="recommendation-list">

                {health.recommendations.map(
                  (recommendation, index) => (
                    <li key={index}>
                      {recommendation}
                    </li>
                  )
                )}

              </ul>
            ) : (
              <p className="empty-health">
                No recommendations available.
              </p>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default AIProjectHealth;