import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CalendarTaskCard from "../components/CalendarTaskCard";
import "../styles/Calendar.css";

function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const selectedTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    return task.dueDate === formatDate(selectedDate);
  });

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="calendar-page">
        <h1>📅 Task Calendar</h1>

        <div className="calendar-container">
          {/* Left: The Calendar Widget */}
          <div className="calendar-left">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={({ date }) => {
                const task = tasks.find((t) => t.dueDate === formatDate(date));
                if (!task) return null;

                const color =
                  task.priority === "LOW" ? "green" : 
                  task.priority === "MEDIUM" ? "yellow" : "red";

                return <div className={`dot ${color}`}></div>;
              }}
            />
          </div>

          {/* Right: The Task List */}
          <div className="calendar-right">
            <div className="task-count-header">
              <h2>📅 {selectedDate.toDateString()}</h2>
              <span>
                {selectedTasks.length} {selectedTasks.length === 1 ? "Task" : "Tasks"}
              </span>
            </div>

            <div className="calendar-task-list">
              {selectedTasks.length === 0 ? (
                <div className="calendar-empty">
                  <div className="empty-icon">📅</div>
                  <h3>No Tasks Scheduled</h3>
                  <p>Enjoy your day! No tasks are due on this date.</p>
                </div>
              ) : (
                selectedTasks.map((task) => (
                  <CalendarTaskCard key={task.id} task={task} />
                ))
              )}
            </div>

            {/* Legend */}
            <div className="calendar-legend">
              <div><span className="dot red"></span> High</div>
              <div><span className="dot yellow"></span> Medium</div>
              <div><span className="dot green"></span> Low</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarPage;