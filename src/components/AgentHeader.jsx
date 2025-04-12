// src/components/AgentHeader.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./agentheader.css";

export default function AgentHeader({ agentName = "Agent Bob" }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth/session if any
    navigate("/");
  };

  const notifications = [
    { type: "admin", message: "Reminder: Update site notes by Friday." },
    { type: "client", message: "Client interested in setup at Newark Mall." },
    { type: "admin", message: "System maintenance this weekend." },
  ];

  return (
    <div className="agent-header">
      <div className="title">Agent Dashboard</div>

      <div className="actions">
        <div className="notif-wrap">
          <button className="notif-icon" onClick={() => setShowNotifications(!showNotifications)}>🔔</button>
          {showNotifications && (
            <div className="notif-dropdown">
              {notifications.map((note, idx) => (
                <div key={idx} className={`notif-item ${note.type}`}>
                  <strong>{note.type === "admin" ? "Admin" : "Client"}:</strong> {note.message}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="avatar-wrap" onClick={() => setShowMenu(!showMenu)}>
          <img src="https://i.pravatar.cc/40" alt="avatar" className="avatar" />
          {showMenu && (
            <div className="user-dropdown">
              <p>{agentName}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
