import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Charts from "./Charts";
import LocationMap from "./LocationMap";
import FeedbackTable from "./FeedbackTable";
import ExportCSV from "./ExportCSV";
import NLPChat from "../NLPChat";
import "./agent.css";

const months = ["Jan 2024", "Feb 2024", "Mar 2024"];

const dummyData = {
  "Jan 2024": {
    profit: 80,
    margin: 25,
    cars: 200,
    citations: 94,
    topProducts: ["Alpha", "Zeta", "Kappa", "Pi", "Chi"]
  },
  "Feb 2024": {
    profit: 70,
    margin: 22,
    cars: 180,
    citations: 90,
    topProducts: ["Zeta", "Chi", "Alpha", "Omega", "Beta"]
  },
  "Mar 2024": {
    profit: 88,
    margin: 28,
    cars: 220,
    citations: 98,
    topProducts: ["Pi", "Chi", "Beta", "Alpha", "Delta"]
  }
};

export default function AgentDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Jan 2024");
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedGem, setSelectedGem] = useState(null);
  const navigate = useNavigate();

  const data = dummyData[selectedMonth];
  const agentName = "Agent Carol";
  const agentEmail = "carol@example.com";
  const loyaltyPoints = 1250;

  const notifications = [
    { type: "admin", message: "Reminder: Update site notes by Friday." },
    { type: "client", message: "Client interested in setup at Newark Mall." },
    { type: "admin", message: "System maintenance this weekend." },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setShowMenu(prev => {
      if (!prev) setShowNotifications(false);
      return !prev;
    });
  };

  const toggleNotifications = () => {
    setShowNotifications(prev => {
      if (!prev) setShowMenu(false);
      return !prev;
    });
  };

  const handleGemClick = (points, title) => {
    setSelectedGem({ points, title });
    alert(`You need ${points} points to reach ${title} status! Current points: ${loyaltyPoints}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (showMenu && !e.target.closest('.avatar-wrap')) ||
        (showNotifications && !e.target.closest('.notif-wrap'))
      ) {
        setShowMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu, showNotifications]);

  const csvData = [
    ["Metric", "Value"],
    ["Profit", data.profit],
    ["Margin", `${data.margin}%`],
    ["Cars", data.cars],
    ["Citations", `${data.citations}%`],
  ];

  return (
    <div className="agent-dashboard">
      {/* Header Section */}
      <header className="dashboard-header integrated-header">
        <h1 className="agentheaderh1">Agent Insights</h1>
        <div className="header-actions">
          {/* Notifications */}
          <div className="notif-wrap">
            <button 
              className={`notif-icon ${notifications.length ? 'has-notifications' : ''}`} 
              onClick={toggleNotifications}
            >
              🔔
            </button>
            {showNotifications && (
              <div className="notif-dropdown">
                <div className="notif-header">
                  Notifications
                  <span>{notifications.length} new</span>
                </div>
                {notifications.map((note, idx) => (
                  <div key={idx} className={`notif-item ${note.type}`}>
                    <strong>{note.type === "admin" ? "Admin" : "Client"}:</strong> {note.message}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="avatar-wrap" onClick={toggleMenu}>
            <img src="https://i.pravatar.cc/40" alt="avatar" className="avatar" />
            {showMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <p>{agentName}</p>
                  <small>{agentEmail}</small>
                </div>
                
                {/* Loyalty Points Section */}
                <div className="loyalty-section">
                  <div className="loyalty-header">
                    <h4>Loyalty Points</h4>
                    <span className="loyalty-points">{loyaltyPoints.toLocaleString()} pts</span>
                  </div>
                  <div className="gem-container">
                    <div 
                      className="gem bronze" 
                      data-points="100" 
                      title="Bronze"
                      onClick={() => handleGemClick(100, "Bronze")}
                    >
                      💎
                    </div>
                    <div 
                      className="gem silver" 
                      data-points="250" 
                      title="Silver"
                      onClick={() => handleGemClick(250, "Silver")}
                    >
                      💎
                    </div>
                    <div 
                      className="gem gold" 
                      data-points="500" 
                      title="Gold"
                      onClick={() => handleGemClick(500, "Gold")}
                    >
                      💎
                    </div>
                    <div 
                      className="gem platinum" 
                      data-points="1,000" 
                      title="Platinum"
                      onClick={() => handleGemClick(1000, "Platinum")}
                    >
                      💎
                    </div>
                    <div 
                      className="gem diamond" 
                      data-points="2,000" 
                      title="Diamond"
                      onClick={() => handleGemClick(2000, "Diamond")}
                    >
                      💎
                    </div>
                  </div>
                </div>
                
                <button onClick={handleLogout} className="logout">Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Month Selection */}
      <div className="metrics-control">
        <label>Select Month: </label>
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>

      {/* Metrics Cards */}
      <div className="metrics">
        <div className="card">
          <h3>Profit</h3>
          <p>${data.profit}M</p>
        </div>
        <div className="card">
          <h3>Margin</h3>
          <p>{data.margin}%</p>
        </div>
        <div className="card">
          <h3>Cars</h3>
          <p>{data.cars}</p>
        </div>
        <div className="card">
          <h3>Citations</h3>
          <p>{data.citations}%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts">
        <div className="chart-box">
          <Charts profit={data.profit} citations={data.citations} margin={data.margin} />
        </div>
      </div>

      {/* Map Section */}
      <div className="map-container">
        <h2>Location Map</h2>
        <LocationMap />
      </div>

      {/* Feedback Table */}
      <FeedbackTable />

      {/* Export Button */}
      <div className="export-btn">
        <ExportCSV 
          data={csvData} 
          filename={`Agent_Metrics_${selectedMonth.replace(' ', '_')}.csv`}
          className="btn"
        >
          Export Report
        </ExportCSV>
      </div>

      {/* AI Chat Assistant */}
      <NLPChat />
    </div>
  );
}