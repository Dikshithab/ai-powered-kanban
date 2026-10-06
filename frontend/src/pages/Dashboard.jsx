import { useEffect, useState } from "react";
import api from "../api/axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddBoard from "../components/AddBoard";
import BoardCard from "../components/BoardCard";
import StatsCard from "../components/StatsCard";
import DashboardCharts from "../components/DashboardCharts";
import ConfirmDialog from "../components/ConfirmDialog";

import { toast } from "react-toastify";
import {
  FaClipboardList,
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaRobot,
  FaExclamationTriangle,
  FaLightbulb,
  FaSyncAlt,
  FaArrowRight,
} from "react-icons/fa";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Confetti from "react-confetti";
import "../styles/dashboard.css";

function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteBoardId, setDeleteBoardId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [aiHealth, setAiHealth] = useState(null);
  const [selectedHealthBoard, setSelectedHealthBoard] = useState("");
  const [healthLoading, setHealthLoading] = useState(false);
  const [earlyWarnings, setEarlyWarnings] = useState(null);
  const [selectedWarningBoard, setSelectedWarningBoard] = useState("");
  const [warningLoading, setWarningLoading] = useState(false);
  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    setLoading(true);
    try {
      const response = await api.get("/boards/");
      setBoards(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load boards");
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (name) => {
    try {
      await api.post("/boards/", { name });
      toast.success("Board Created");
      loadBoards();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create board");
    }
  };

  const deleteBoard = async () => {
    try {
      await api.delete(`/boards/${deleteBoardId}/`);
      toast.success("Board Deleted");
      setDeleteBoardId(null);
      loadBoards();
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    }
  };
  const analyzeProjectHealth = async () => {
    if (!selectedHealthBoard) {
      toast.warning("Please select a board first");
      return;
    }

    setHealthLoading(true);

    try {
      const response = await api.post("/ai/project-health/", {
        board_id: selectedHealthBoard,
      });

      setAiHealth(response.data);

      toast.success("AI Project Health analyzed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze project health");
    } finally {
      setHealthLoading(false);
    }
  };
  const analyzeEarlyWarnings = async () => {
  if (!selectedWarningBoard) {
    toast.warning("Please select a board first");
    return;
  }

  setWarningLoading(true);

  try {
    const response = await api.post("/ai/early-warnings/", {
      board_id: selectedWarningBoard,
    });

    setEarlyWarnings(response.data);

    toast.success("AI Early Warning analysis completed");
  } catch (error) {
    console.error(error);
    toast.error("Failed to analyze early warnings");
  } finally {
    setWarningLoading(false);
  }
};

  const filteredBoards = boards.filter((board) =>
    board.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalTasks = boards.reduce(
    (count, board) => count + (board.tasks?.length || 0),
    0,
  );

  const completedTasks = boards.reduce(
    (count, board) =>
      count +
      (board.tasks
        ? board.tasks.filter((task) => task.status === "DONE").length
        : 0),
    0,
  );

  const pendingTasks = totalTasks - completedTasks;

  const productivity =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const today = new Date().toISOString().split("T")[0];

  const dueToday = boards
    .flatMap((board) => board.tasks || [])
    .filter((task) => task.dueDate === today);

  const overdue = boards
    .flatMap((board) => board.tasks || [])
    .filter(
      (task) =>
        task.status !== "DONE" &&
        task.dueDate &&
        new Date(task.dueDate) < new Date(),
    );

  useEffect(() => {
    if (productivity === 100 && totalTasks > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [productivity, totalTasks]);

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
        ? "Good Afternoon 🌤️"
        : "Good Evening 🌙";
  const getHealthClass = (status) => {
    if (status === "HEALTHY") return "healthy";
    if (status === "WARNING") return "warning";
    if (status === "CRITICAL") return "critical";
    return "warning";
  };

  return (
    <>
      {showConfetti && <Confetti />}

      <Sidebar />
      <Navbar />

      <div className="dashboard">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="dashboard-hero">
            <div>
              <h1>{greeting}</h1>
              <p>
                Manage your projects, organize tasks, and boost your
                productivity.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="stats-section">
          <div className="stats-grid">
            <StatsCard
              className="stat-card"
              icon={<FaClipboardList />}
              title="Boards"
              value={boards.length}
            />
            <StatsCard
              className="stat-card"
              icon={<FaTasks />}
              title="Tasks"
              value={totalTasks}
            />
            <StatsCard
              className="stat-card"
              icon={<FaClock />}
              title="Pending"
              value={pendingTasks}
            />
            <StatsCard
              className="stat-card"
              icon={<FaCheckCircle />}
              title="Completed"
              value={completedTasks}
            />
            <StatsCard
              className="stat-card"
              icon="⚠️"
              title="Overdue"
              value={overdue.length}
            />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="analytics-section">
          {/* Left Side: Charts */}
          <div className="analytics-left">
            <div className="chart-card">
              <DashboardCharts boards={boards} />
            </div>
          </div>

          {/* AI PROJECT HEALTH */}
          <div className="ai-health-section">
            <div className="ai-health-header">
              <div>
                <h2>
                  <FaRobot /> AI Project Health
                </h2>

                <p>
                  Analyze project progress, deadlines, priorities and
                  dependencies.
                </p>
              </div>

              <div className="ai-health-controls">
                <select
                  value={selectedHealthBoard}
                  onChange={(e) => setSelectedHealthBoard(e.target.value)}
                >
                  <option value="">Select Board</option>

                  {boards.map((board) => (
                    <option key={board.id} value={board.id}>
                      {board.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={analyzeProjectHealth}
                  disabled={healthLoading || !selectedHealthBoard}
                >
                  {healthLoading ? (
                    <>
                      <FaSyncAlt className="spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FaRobot />
                      Analyze Health
                    </>
                  )}
                </button>
              </div>
            </div>
            {/* ================= AI EARLY WARNING ================= */}

<section className="early-warning-section">

  <div className="early-warning-header">

    <div>
      <div className="early-warning-title">
        <FaExclamationTriangle />

        <div>
          <h2>AI Early Warning</h2>
          <p>
            Detect tasks that may miss their deadlines before they become
            problems.
          </p>
        </div>
      </div>
    </div>

    <div className="early-warning-controls">

      <select
        value={selectedWarningBoard}
        onChange={(e) => setSelectedWarningBoard(e.target.value)}
      >
        <option value="">Select Board</option>

        {boards.map((board) => (
          <option key={board.id} value={board.id}>
            {board.name}
          </option>
        ))}
      </select>

      <button
        className="early-warning-button"
        onClick={analyzeEarlyWarnings}
        disabled={warningLoading}
      >
        {warningLoading ? (
          <>
            <FaSyncAlt className="spin" />
            Analyzing...
          </>
        ) : (
          <>
            <FaExclamationTriangle />
            Analyze Risks
          </>
        )}
      </button>

    </div>

  </div>


  {/* Initial State */}

  {!earlyWarnings && !warningLoading && (
    <div className="early-warning-empty">

      <FaExclamationTriangle />

      <h3>No Risk Analysis Yet</h3>

      <p>
        Select a board and run AI Early Warning to identify tasks
        that may fall behind schedule.
      </p>

    </div>
  )}


  {/* Loading */}

  {warningLoading && (
    <div className="early-warning-loading">

      <FaSyncAlt className="spin" />

      <p>
        AI is analyzing task deadlines, priorities and dependencies...
      </p>

    </div>
  )}


  {/* Results */}

  {earlyWarnings && !warningLoading && (

    <div className="early-warning-results">

      {/* Summary */}

      <div className="warning-summary">

        <div>
          <span>Risky Tasks</span>

          <strong>
            {earlyWarnings.total_warnings}
          </strong>
        </div>

        <div>
          <span>Board</span>

          <strong>
            {earlyWarnings.board_name}
          </strong>
        </div>

      </div>


      {/* No warnings */}

      {earlyWarnings.warnings.length === 0 && (

        <div className="no-warning">

          <FaCheckCircle />

          <h3>Everything Looks Good 🎉</h3>

          <p>
            No tasks are currently showing a significant risk
            of missing their deadlines.
          </p>

        </div>

      )}


      {/* Warning Cards */}

      {earlyWarnings.warnings.length > 0 && (

        <div className="warning-list">

          {earlyWarnings.warnings.map((warning) => (

            <div
              key={warning.task_id}
              className={`warning-card ${warning.risk_level.toLowerCase()}`}
            >

              <div className="warning-card-top">

                <div className="warning-task-info">

                  <FaExclamationTriangle />

                  <div>

                    <h3>{warning.title}</h3>

                    <span>
                      {warning.status.replace("_", " ")}
                    </span>

                  </div>

                </div>

                <div className="risk-badge">

                  {warning.risk_level} RISK

                </div>

              </div>


              <div className="risk-score">

                <span>Risk Score</span>

                <strong>
                  {warning.risk_score}/100
                </strong>

              </div>


              <div className="warning-details">

                <h4>Why is this task at risk?</h4>

                <ul>

                  {warning.risk_factors.map(
                    (factor, index) => (
                      <li key={index}>
                        {factor}
                      </li>
                    )
                  )}

                </ul>

              </div>


              {warning.blocked_by.length > 0 && (

                <div className="blocked-section">

                  <strong>
                    Blocked by:
                  </strong>

                  {warning.blocked_by.map(
                    (dependency, index) => (
                      <span key={index}>
                        {dependency}
                      </span>
                    )
                  )}

                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  )}

</section>

            {/* Initial State */}
            {!aiHealth && !healthLoading && (
              <div className="ai-health-empty">
                <FaRobot />

                <h3>AI-powered project analysis</h3>

                <p>
                  Select a board and let AI identify project risks, overdue
                  work, blocked tasks and improvement opportunities.
                </p>
              </div>
            )}

            {/* Loading */}
            {healthLoading && (
              <div className="ai-health-loading">
                <div className="ai-loader">
                  <FaRobot />
                </div>

                <h3>Analyzing your project...</h3>

                <p>Checking tasks, deadlines, priorities and dependencies.</p>
              </div>
            )}

            {/* AI Result */}
            {aiHealth && !healthLoading && (
              <div className="ai-health-content">
                {/* Score */}
                <div
                  className={`health-score-card ${getHealthClass(
                    aiHealth.health_status,
                  )}`}
                >
                  <div className="health-score">
                    <strong>{aiHealth.health_score}</strong>

                    <span>/100</span>
                  </div>

                  <div className="health-status-badge">
                    {aiHealth.health_status}
                  </div>

                  <p>{aiHealth.summary}</p>
                </div>

                {/* Metrics */}
                {aiHealth.metrics && (
                  <div className="health-metrics">
                    <div className="health-metric">
                      <span>Total Tasks</span>
                      <strong>{aiHealth.metrics.total_tasks}</strong>
                    </div>

                    <div className="health-metric">
                      <span>Completed</span>
                      <strong>{aiHealth.metrics.completed_tasks}</strong>
                    </div>

                    <div className="health-metric">
                      <span>In Progress</span>
                      <strong>{aiHealth.metrics.in_progress_tasks}</strong>
                    </div>

                    <div className="health-metric">
                      <span>Overdue</span>
                      <strong>{aiHealth.metrics.overdue_tasks}</strong>
                    </div>

                    <div className="health-metric">
                      <span>High Priority</span>
                      <strong>{aiHealth.metrics.high_priority_pending}</strong>
                    </div>

                    <div className="health-metric">
                      <span>Blocked</span>
                      <strong>{aiHealth.metrics.blocked_tasks}</strong>
                    </div>
                  </div>
                )}

                {/* Risks */}
                <div className="health-column">
                  <div className="health-panel">
                    <h3>
                      <FaExclamationTriangle />
                      Risks
                    </h3>

                    {aiHealth.risks?.length === 0 ? (
                      <p className="no-risk">No major risks detected 🎉</p>
                    ) : (
                      aiHealth.risks?.map((risk, index) => (
                        <div
                          key={index}
                          className={`risk-item ${risk.severity?.toLowerCase()}`}
                        >
                          <div>
                            <strong>{risk.title}</strong>
                            <p>{risk.description}</p>
                          </div>

                          <span>{risk.severity}</span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Recommendations */}
                  <div className="health-panel">
                    <h3>
                      <FaLightbulb />
                      AI Recommendations
                    </h3>

                    {aiHealth.recommendations?.map((recommendation, index) => (
                      <div key={index} className="recommendation-item">
                        <span>✓</span>
                        <p>{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Progress & Tasks */}
          <div className="analytics-right">
            <div className="progress-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={productivity}
                  text={`${productivity}%`}
                />
              </div>
              <h3>Overall Productivity</h3>
            </div>

            <div className="due-card">
              <h2>📅 Due Today</h2>
              {dueToday.length === 0 ? (
                <p>No tasks due today 🎉</p>
              ) : (
                dueToday.map((task) => (
                  <div key={task.id} className="due-task">
                    <strong>{task.title}</strong>
                    <span>{task.priority}</span>
                  </div>
                ))
              )}
            </div>

            <div className="due-card">
              <h2>Recent Boards</h2>
              {boards.length === 0 ? (
                <p>No Boards Available</p>
              ) : (
                boards.slice(0, 5).map((board) => (
                  <div key={board.id} className="due-task">
                    <span>📁 {board.name}</span>
                    <strong>{board.tasks?.length || 0} Tasks</strong>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Toolbar: Search & Actions */}
        <div className="boards-toolbar">
          <input
            type="text"
            className="search-box"
            placeholder="🔍 Search Boards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AddBoard onCreate={createBoard} />
        </div>

        {/* Board Display List */}
        <div className="boards-list">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} height={140} borderRadius={15} />
            ))
          ) : filteredBoards.length === 0 ? (
            <div className="empty-state">
              <h1>📁</h1>
              <h2>No Boards Yet</h2>
              <p>Create your first board.</p>
            </div>
          ) : (
            filteredBoards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onDelete={setDeleteBoardId}
              />
            ))
          )}
        </div>

        {/* Delete Dialog Confirmation */}
        {deleteBoardId && (
          <ConfirmDialog
            title="Delete Board"
            message="This action cannot be undone."
            onConfirm={deleteBoard}
            onCancel={() => setDeleteBoardId(null)}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
