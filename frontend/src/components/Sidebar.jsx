import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaClipboardList,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes
} from "react-icons/fa";
import api from "../api/axios";

import "../styles/Sidebar.css";

function Sidebar() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navigationItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaThLarge /> },
    { path: "/boards", label: "Boards", icon: <FaClipboardList /> },
    { path: "/calendar", label: "Calendar", icon: <FaCalendarAlt /> },
    { path: "/settings", label: "Settings", icon: <FaCog /> },
    { path: "/profile", label: "Profile", icon: <FaUser /> }
  ];
useEffect(() => {
  const loadProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  loadProfile();
}, []);

  return (
    <>
      {/* Mobile Toggle Trigger Action */}
      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        type="button"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Backdrop background masking for mobile pullouts */}
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

      <aside className={`sidebar ${open ? "show" : ""}`}>
        <div className="sidebar-top">
          <div className="logo">
            <h2>🚀 KanbanX</h2>
          </div>

          <div className="profile">
            <div className="avatar">
  {user?.name?.charAt(0).toUpperCase()}
</div>

<h3>{user?.name}</h3>
</div>

          <nav aria-label="Main Navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;