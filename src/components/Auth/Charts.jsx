import { BarChart, Bar, PieChart, Pie, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

export default function Charts({ profit, margin, citations }) {
  const pieData = [
    { name: "Citations", value: citations },
    { name: "Other", value: 100 - citations },
  ];

  const barData = [
    { name: "Profit", value: profit },
    { name: "Margin", value: margin },
  ];

  const lineData = [
    { month: "Jan", value: profit },
    { month: "Feb", value: profit - 10 },
    { month: "Mar", value: profit + 8 },
  ];

  return (
    <div className="charts">
      <div className="chart-box">
        <h3>EV Growth Projections</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#2ecc71" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Charging Stations (Current vs Needed)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3498db" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Public vs Private Charging Stations</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={70} label>
              <Cell fill="#2ecc71" />
              <Cell fill="#ecf0f1" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
