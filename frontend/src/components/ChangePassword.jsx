import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (
      !oldPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await api.post("/users/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success("Password Changed Successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data || "Failed to change password"
      );
    }
  };

  return (
    <>
      <div className="input-group">
        <label>Current Password</label>

        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>New Password</label>

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Confirm Password</label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        className="setting-btn"
        onClick={handleChangePassword}
      >
        Change Password
      </button>
    </>
  );
}

export default ChangePassword;