import { useState } from "react";
import Charts from "./Charts";
import LocationMap from "./LocationMap";
import ExportCSV from "./ExportCSV";
import "./agent.css";

const months = ["Quater 1", "Quater 2", "Quater 3"];

const dummyData = {
  "Quater 1": {
    profit: 80,
    margin: 25,
    cars: 200,
    citations: 94,
    topProducts: ["Alpha", "Zeta", "Kappa", "Pi", "Chi"]
  },
  "Quater 2": {
    profit: 70,
    margin: 22,
    cars: 180,
    citations: 90,
    topProducts: ["Zeta", "Chi", "Alpha", "Omega", "Beta"]
  },
  "Quater 3": {
    profit: 88,
    margin: 28,
    cars: 220,
    citations: 98,
    topProducts: ["Pi", "Chi", "Beta", "Alpha", "Delta"]
  }
};

export default function AgentDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Jan 2024");

  const data = dummyData[selectedMonth];

  const csvData = [
    ["Metric", "Value"],
    ["Profit", data.profit],
    ["Margin", `${data.margin}%`],
    ["Cars", data.cars],
    ["Citations", `${data.citations}%`],
  ];

  return (
    <div className="agent-dashboard">
      <header className="dashboard-header">
        <h1>Agent Insights</h1>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {months.map((m) => <option key={m}>{m}</option>)}
        </select>
      </header>

      <div className="metrics">
        <div className="card">Profit: ${data.profit}M</div>
        <div className="card">Margin: {data.margin}%</div>
        <div className="card">Cars: {data.cars}</div>
        <div className="card">Citations: {data.citations}%</div>
      </div>

      <Charts profit={data.profit} citations={data.citations} margin={data.margin} />

      <LocationMap />

      <ExportCSV data={csvData} filename={`Agent_Metrics_${selectedMonth}.csv`} />
    </div>
  );
}
