import { useState } from "react";
import "../styles/AddBoard.css";

function AddBoard({ onCreate }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    if (name.trim() === "") {
      alert("Board name is required");
      return;
    }

    onCreate(name);
    setName("");
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        className="create-board-btn"
        onClick={() => setShowModal(true)}
      >
        + Create New Board
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          {/* stopPropagation prevents modal closing when clicking inside the window panel */}
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create Board</h2>
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Board Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />

              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="create-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddBoard;