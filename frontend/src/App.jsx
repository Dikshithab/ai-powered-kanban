import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Boards from "./pages/Boards";
import BoardDetails from "./pages/BoardDetails";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* =========================
            PROTECTED ROUTES
        ========================== */}

        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/boards" element={<Boards />} />

          <Route path="/board/:id" element={<BoardDetails />} />

          <Route path="/calendar" element={<Calendar />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/settings" element={<Settings />} />

        </Route>


        {/* =========================
            404
        ========================== */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;