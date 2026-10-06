
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddBoard from "../components/AddBoard";
import { FaFolder, FaArrowRight } from "react-icons/fa";
import "../styles/Boards.css";

function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      const res = await api.get("/boards/");
      console.log("Boards:", res.data);
      setBoards(res.data);
    } catch (err) {
      console.error(
        "Error loading boards:",
        err.response?.data || err.message
      );
    }
  };

  const createBoard = async (name) => {
    if (!name || !name.trim()) {
      alert("Please enter a board name");
      return;
    }

    try {
      const res = await api.post("/boards/", {
        name: name.trim(),
      });

      console.log("Board created:", res.data);

      // Reload boards after successful creation
      await loadBoards();
    } catch (err) {
      console.error(
        "Error creating board:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to create board"
      );
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="boards-page">
        {/* Header Section */}
        <div className="boards-header">
          <div>
            <h1>📂 My Boards</h1>
            <p>
              Organize your workspaces and manage projects efficiently.
            </p>
          </div>

          <AddBoard onCreate={createBoard} />
        </div>

        {/* Dynamic Board Grid */}
        <div className="boards-grid">
          {boards.length === 0 ? (
            <div className="empty-board">
              <h1>📁</h1>
              <h2>No Boards Yet</h2>
              <p>
                Create your first board to start managing tasks.
              </p>
            </div>
          ) : (
            boards.map((board) => (
              <div className="board-card-new" key={board.id}>
                <div className="board-top">
                  <div className="board-icon">
                    <FaFolder />
                  </div>

                  <span className="task-count">
                    {board.tasks?.length || 0} Tasks
                  </span>
                </div>

                <h2>{board.name}</h2>

                <p>
                  Organize your project tasks efficiently.
                </p>

                <Link
                  to={`/board/${board.id}`}
                  className="open-btn"
                >
                  Open Board
                  <FaArrowRight />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Boards;
