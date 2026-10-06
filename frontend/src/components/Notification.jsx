import { useState } from "react";
import { FaBell } from "react-icons/fa";

function Notifications({ dueToday, overdue }) {

    const [open, setOpen] = useState(false);

    return (
        <div className="notification-box">

            <button
                className="bell-btn"
                onClick={() => setOpen(!open)}
            >
                <FaBell />

                {(dueToday.length + overdue.length) > 0 && (
                    <span className="badge">
                        {dueToday.length + overdue.length}
                    </span>
                )}
            </button>

            {open && (
                <div className="notification-dropdown">

                    {overdue.map(task => (
                        <p key={task.id}>
                            ⚠️ {task.title} is overdue
                        </p>
                    ))}

                    {dueToday.map(task => (
                        <p key={task.id}>
                            📅 {task.title} is due today
                        </p>
                    ))}

                    {dueToday.length === 0 &&
                     overdue.length === 0 && (
                        <p>🎉 No notifications</p>
                    )}

                </div>
            )}

        </div>
    );
}

export default Notifications;