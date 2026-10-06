
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api/axios";
import "../styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/register/", {
        name: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("Registration response:", response.data);

      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.error("Registration error:", error);

      const data = error.response?.data;

      let message = "Registration failed";

      if (typeof data === "string") {
        message = data;
      } else if (data?.message) {
        message = data.message;
      } else if (data?.detail) {
        message = data.detail;
      } else if (data?.email) {
        message = Array.isArray(data.email)
          ? data.email[0]
          : data.email;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* =========================
          LEFT BRANDING
      ========================= */}

      <div className="register-brand">

        <div className="register-brand-content">

          <div className="register-logo">
            <span>✓</span>
            Kanban
          </div>

          <div className="register-hero">
            <p className="register-label">YOUR WORKSPACE</p>

            <h1>
              Everything you need
              <br />
              to <span>stay organized.</span>
            </h1>

            <p>
              Create your workspace, manage projects,
              track tasks, and keep your team moving
              toward the finish line.
            </p>
          </div>

          <div className="register-points">
            <div>
              <span>✓</span>
              Organize projects effortlessly
            </div>

            <div>
              <span>✓</span>
              Track tasks in real time
            </div>

            <div>
              <span>✓</span>
              Stay focused on what matters
            </div>
          </div>

        </div>

      </div>

      {/* =========================
          REGISTER FORM
      ========================= */}

      <div className="register-section">

        <div className="register-wrapper">

          <div className="register-mobile-logo">
            <div className="register-logo">
              <span>✓</span>
              Kanban
            </div>
          </div>

          <div className="register-heading">
            <p className="register-welcome">
              GET STARTED
            </p>

            <h2>Create your account</h2>

            <p>
              Set up your account and start organizing your
              work today.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="register-form"
          >

            {/* Name */}

            <div className="register-field">
              <label htmlFor="username">
                Full name
              </label>

              <div className="register-input-wrapper">
                <FaUser className="register-input-icon" />

                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Email */}

            <div className="register-field">
              <label htmlFor="email">
                Email address
              </label>

              <div className="register-input-wrapper">
                <FaEnvelope className="register-input-icon" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}

            <div className="register-field">
              <label htmlFor="password">
                Password
              </label>

              <div className="register-input-wrapper">
                <FaLock className="register-input-icon" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <span className="password-hint">
                Use at least 6 characters
              </span>
            </div>

            {/* Confirm Password */}

            <div className="register-field">
              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="register-input-wrapper">
                <FaLock className="register-input-icon" />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="register-spinner"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <FaArrowRight />
                </>
              )}
            </button>

          </form>

          <div className="register-login">
            <span>Already have an account?</span>

            <Link to="/">
              Sign in
            </Link>
          </div>

          <p className="register-terms">
            By creating an account, you agree to our
            Terms of Service and Privacy Policy.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;
