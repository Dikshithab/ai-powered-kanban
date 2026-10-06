
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowRight, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api/axios";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/login/", {
        email: email.trim(),
        password,
      });

      console.log("Login response:", response.data);

      const accessToken = response.data?.access;
      const refreshToken = response.data?.refresh;

      if (!accessToken) {
        toast.error("Login failed: access token not received");
        return;
      }

      localStorage.setItem("token", accessToken);

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        const message =
          error.response.data?.message ||
          error.response.data?.detail ||
          "Invalid email or password";

        toast.error(message);
      } else if (error.request) {
        toast.error("Unable to connect to the server");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Left Branding */}
      <div className="login-brand">
        <div className="brand-content">

          <div className="brand-logo">
            <span>✓</span>
            Kanban
          </div>

          <div className="brand-message">
            <p className="brand-label">WORK SMARTER</p>

            <h1>
              Turn your ideas
              <br />
              into <span>action.</span>
            </h1>

            <p className="brand-description">
              Plan projects, organize tasks, and keep your
              entire workflow moving forward from one
              simple workspace.
            </p>
          </div>

          <div className="brand-feature">
            <div className="feature-dot"></div>
            <span>Simple. Focused. Productive.</span>
          </div>

        </div>
      </div>

      {/* Login Section */}
      <div className="login-section">
        <div className="login-wrapper">

          <div className="mobile-logo">
            <div className="brand-logo">
              <span>✓</span>
              Kanban
            </div>
          </div>

          <div className="login-heading">
            <p className="welcome-text">WELCOME BACK</p>
            <h2>Sign in to your account</h2>
            <p>
              Enter your details to continue to your workspace.
            </p>
          </div>

          <form onSubmit={handleLogin} className="login-form">

            <div className="form-field">
              <label htmlFor="email">Email address</label>

              <div className="field-wrapper">
                <FaEnvelope className="field-icon" />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <div className="password-label">
                <label htmlFor="password">Password</label>

                <span className="forgot-password">
                  Forgot password?
                </span>
              </div>

              <div className="field-wrapper">
                <FaLock className="field-icon" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <FaArrowRight />
                </>
              )}
            </button>

          </form>

          <div className="login-divider">
            <span>New to Kanban?</span>
          </div>

          <Link to="/register" className="create-account">
            Create an account
          </Link>

          <p className="login-terms">
            By continuing, you agree to our Terms of Service
            and Privacy Policy.
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
