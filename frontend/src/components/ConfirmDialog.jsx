import "../styles/ConffirmDialog.css";

function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      {/* e.stopPropagation ensures clicking the alert pane box itself won't close it */}
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>

        <div className="confirm-buttons">
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={onCancel}
          >
            Cancel
          </button>
          
          <button 
            type="button" 
            className="delete-btn" 
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;