import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/login.css";

function Auth() {

    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleRegister = async (e) => {

    e.preventDefault();

    try {

        await api.post("/register/", {
            name,
            email,
            password
        });

        alert("Registration Successful");

        setName("");
        setEmail("");
        setPassword("");

        setIsActive(false);

    } catch (error) {

        console.log(error);

        alert(error.response?.data?.message || "Registration Failed");

    }

};
const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post("/login/", {
            email: loginEmail,
            password: loginPassword
        });

        const token = response.data?.access || response.data?.token || response.data;
        if (response.data?.refresh) {
            localStorage.setItem("refreshToken", response.data.refresh);
        }

        localStorage.setItem("token", token);

        alert("Login Successful");

        navigate("/dashboard");

    } catch (error) {

        console.log(error);

        alert(error.response?.data?.message || "Invalid Credentials");

    }

};
const handleLogin = async (e) => {
    return (

        <div className="auth-page">

            <div
                className={`container ${isActive ? "active" : ""}`}
            >
                {/* Sign Up Form */}
<div className="form-container sign-up">

    <form onSubmit={handleRegister}>

        <h1>Create Account</h1>

        <div className="social-container">

            <a href="#" className="social">
                <i className="fa-brands fa-google"></i>
            </a>

            <a href="#" className="social">
                <i className="fa-brands fa-apple"></i>
            </a>

            <a href="#" className="social">
                <i className="fa-brands fa-facebook"></i>
            </a>

        </div>

        <span>or use your email for registration</span>

        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
            Sign Up
        </button>

    </form>

</div>

{/* Sign In Form */}

<div className="form-container sign-in">

    <form onSubmit={handleLogin}>

        <h1>Sign In</h1>

        <div className="social-container">

            <a href="#" className="social">
                <i className="fa-brands fa-google"></i>
            </a>

            <a href="#" className="social">
                <i className="fa-brands fa-apple"></i>
            </a>

            <a href="#" className="social">
                <i className="fa-brands fa-facebook"></i>
            </a>

        </div>

        <span>or use your email for login</span>

        <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
        />

        <a href="#">
            Forgot your password?
        </a>

        <button type="submit">
            Sign In
        </button>

    </form>

</div>

{/* Toggle Section */}

<div className="toggle-container">

    <div className="toggle">

        <div className="toggle-panel toggle-left">

            <h1>Welcome Back!</h1>

            <p>
                To keep connected with us please login with your personal info
            </p>

            <button
                type="button"
                className="hidden"
                onClick={() => setIsActive(false)}
            >
                Sign In
            </button>

        </div>

        <div className="toggle-panel toggle-right">

            <h1>Hello, Friend!</h1>

            <p>
                Enter your personal details and start your journey with us
            </p>

            <button
                type="button"
                className="hidden"
                onClick={() => setIsActive(true)}
            >
                Sign Up
            </button>

        </div>

    </div>

</div>
        </div>
    </div>
);
}
}

export default Auth;