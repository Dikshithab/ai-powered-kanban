import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChangePassword from "../components/ChangePassword";
import EditProfile from "../components/EditProfile";
import "../styles/Setting.css";
import api from "../api/axios";

function Settings() {
  const [boards, setBoards] = useState([]);
  const [user, setUser] = useState(null);

  const loadProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setUser(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    }
  };

  const loadBoards = async () => {
    try {
      const response = await api.get("/boards");
      setBoards(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    loadProfile();
    loadBoards();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    window.location.href = "/";
  };

  const totalBoards = boards.length;

  const totalTasks = boards.reduce(
    (count, board) => count + (board.tasks?.length || 0),
    0,
  );

  // Convert Django media URL into a complete URL
  const getProfilePhotoUrl = () => {
    if (!user?.profile_photo) {
      return null;
    }

    if (user.profile_photo.startsWith("http")) {
      return user.profile_photo;
    }

    return `http://127.0.0.1:8000${user.profile_photo}`;
  };

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="settings-page">
        <div className="settings-header">
          <h1>⚙ Settings</h1>
          <p>Manage your account and application preferences.</p>
        </div>

        <div className="settings-grid">

          {/* PROFILE */}
          <div className="settings-card">
            <h2>👤 Profile</h2>

            <div className="profile-section">

              <div className="profile-avatar">
                {getProfilePhotoUrl() ? (
                  <img
                    src={getProfilePhotoUrl()}
                    alt="Profile"
                    className="settings-profile-image"
                  />
                ) : (
                  user?.name?.charAt(0).toUpperCase()
                )}
              </div>

              <div className="profile-info">
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>

                <span className="profile-badge">
                  Active User
                </span>
              </div>
            </div>

            <EditProfile
              user={user}
              onUpdate={setUser}
            />
          </div>

          {/* APPEARANCE */}
          <div className="settings-card">
            <h2>🎨 Appearance</h2>

            <div className="setting-row">
              <span>Dark Mode</span>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => {
                  setDarkMode(!darkMode);

                  toast.success(
                    !darkMode
                      ? "Dark Mode Enabled"
                      : "Light Mode Enabled",
                  );
                }}
              />
            </div>
          </div>

          {/* SECURITY */}
          <div className="settings-card">
            <h2>🔒 Security</h2>

            <ChangePassword />
          </div>

          {/* NOTIFICATIONS */}
          <div className="settings-card">
            <h2>🔔 Notifications</h2>

            <div className="setting-row">
              <span>Email Notifications</span>

              <input type="checkbox" defaultChecked />
            </div>

            <div className="setting-row">
              <span>Task Reminders</span>

              <input type="checkbox" defaultChecked />
            </div>
          </div>

          {/* WORKSPACE */}
          <div className="settings-card">
            <h2>📊 Workspace</h2>

            <p>📁 Total Boards : {totalBoards}</p>
            <p>✅ Total Tasks : {totalTasks}</p>
          </div>

          {/* LOGOUT */}
          <div className="settings-card danger">
            <h2>🚪 Logout</h2>

            <button
              className="logout-btn-setting"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* ABOUT */}
          <div className="settings-card">
            <h2>ℹ️ About</h2>

            <p>Kanban Project Management</p>

            <p>Version 1.0.0</p>

            <p>Built with React + Django + MySQL</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Settings;