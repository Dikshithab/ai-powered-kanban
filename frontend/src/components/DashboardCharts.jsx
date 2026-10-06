import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import "../styles/DashboardCharts.css";

function DashboardCharts({ boards = [] }) {
  // Extract all tasks across all boards safely
  const tasks = boards.flatMap((board) => board.tasks || []);

  const statusData = [
    { name: "Todo", value: tasks.filter((t) => t.status === "TODO").length, key: "TODO" },
    { name: "In Progress", value: tasks.filter((t) => t.status === "IN_PROGRESS").length, key: "IN_PROGRESS" },
    { name: "Done", value: tasks.filter((t) => t.status === "DONE").length, key: "DONE" },
  ];

  const priorityData = [
    { priority: "High", Tasks: tasks.filter((t) => t.priority === "HIGH").length },
    { priority: "Medium", Tasks: tasks.filter((t) => t.priority === "MEDIUM").length },
    { priority: "Low", Tasks: tasks.filter((t) => t.priority === "LOW").length },
  ];

  // Explicit status color mapping rules (Red, Yellow/Amber, Green)
  const STATUS_COLORS = {
    TODO: "#ef4444",
    IN_PROGRESS: "#f59e0b",
    DONE: "#22c55e",
  };

  return (
    <div className="dashboard-charts">
      {/* Status Distribution Card */}
      <div className="chart-card">
        <h3>Task Status</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={60} /* Transformed into a modern Donut Chart style */
                paddingAngle={4}
                label
              >
                {statusData.map((entry) => (
                  <Cell
                    key={`cell-${entry.key}`}
                    fill={STATUS_COLORS[entry.key]}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "10px", 
                  border: "none", 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)" 
                }} 
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority Distribution Card */}
      <div className="chart-card">
        <h3>Priority Distribution</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.15)" />
              <XAxis dataKey="priority" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip 
                cursor={{ fill: "rgba(99, 102, 241, 0.04)" }}
                contentStyle={{ 
                  borderRadius: "10px", 
                  border: "none", 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)" 
                }}
              />
              <Bar
                dataKey="Tasks"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashboardCharts;