import { useNavigate } from "react-router-dom";
import { FaFolderOpen, FaTrash } from "react-icons/fa";
import "../styles/BoardCard.css";

function BoardCard({ board, onDelete }) {
  const navigate = useNavigate();

  const total = board.tasks?.length || 0;
  const completed = board.tasks?.filter((task) => task.status === "DONE").length || 0;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const handleDelete = (e) => {
    e.stopPropagation(); // Stops the click from bubbling up to the board-info navigation link
    if (window.confirm(`Are you sure you want to delete "${board.name}"?`)) {
      onDelete(board.id);
    }
  };

  return (
    <div className="board-card" onClick={() => navigate(`/board/${board.id}`)}>
      <div className="board-main-content">
        <div className="board-info-wrapper">
          <div className="board-icon">
            <FaFolderOpen />
          </div>
          <div className="board-text">
            <h3>{board.name}</h3>
            <p>{total} Tasks</p>
          </div>
        </div>

        <div className="board-actions">
          <button 
            type="button"
            className="delete-btn" 
            onClick={handleDelete}
            title="Delete Board"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {completed} of {total} Tasks Completed
        </p>
      </div>
    </div>
  );
}

export default BoardCard;