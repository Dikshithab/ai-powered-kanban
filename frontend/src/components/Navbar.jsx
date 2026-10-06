import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { ThemeContext } from "../context/ThemeContext";
import "../styles/Navbar.css";
import { useState } from "react";
import api from "../api/axios";

function Navbar() {

  const navigate = useNavigate();

  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  navigate("/login", { replace: true });
};


  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };


  const handleNotification = () => {
    alert("No new notifications");
  };


  const handleProfile = () => {
    navigate("/profile");
  };

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

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");

    } else {

      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");

    }

  }, [darkMode]);


  return (

    <header className="navbar">

      <h2 className="page-title">
        Kanban Dashboard
      </h2>


      <nav className="navbar-right" aria-label="Quick links">


        <button
          className="nav-icon"
          aria-label="Notifications"
          type="button"
          onClick={handleNotification}
        >
          <FaBell />
        </button>

<button
className="profile-btn"
onClick={handleProfile}
>

<FaUserCircle size={22} />

<h4>
{user?.name || "My Account"}
</h4>

</button>


        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          type="button"
        >

          {darkMode ? <FaSun /> : <FaMoon />}

        </button>


        <button
          className="logout-btn"
          onClick={logout}
          type="button"
        >

          <FaSignOutAlt aria-hidden="true" />

          <span>
            Logout
          </span>

        </button>


      </nav>

    </header>

  );
}


export default Navbar;