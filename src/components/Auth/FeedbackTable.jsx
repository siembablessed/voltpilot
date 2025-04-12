// src/components/FeedbackTable.jsx
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './feedback.css';

const initialData = [
  {
    location: 'New York City',
    month: 'Jan 2024',
    status: 'acquired',
    notes: 'Successful siting at municipal lot.',
    level: 'AC Level One',
  },
  {
    location: 'Los Angeles',
    month: 'Jan 2024',
    status: 'possible',
    notes: 'Good location but needs city approval.',
    level: 'AC Level Two',
  },
  {
    location: 'Chicago',
    month: 'Jan 2024',
    status: 'challenged',
    notes: 'Bad infrastructure and unstable grid.',
    level: 'DCFC',
  },
];

export default function FeedbackTable() {
  const [rows, setRows] = useState(initialData);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Feedback');
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(fileData, 'EV_Station_Feedback_Report.xlsx');
  };

  return (
    <div className="feedback-table-container">
      <h3>Feedback / Site Notes</h3>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Month</th>
            <th>Status</th>
            <th>Charging Level</th>
            <th>Site Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>
                <input
                  value={row.location}
                  onChange={(e) => handleChange(i, 'location', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={row.month}
                  onChange={(e) => handleChange(i, 'month', e.target.value)}
                >
                  {["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={row.status}
                  onChange={(e) => handleChange(i, 'status', e.target.value)}
                >
                  <option value="acquired">Acquired</option>
                  <option value="possible">Possible</option>
                  <option value="challenged">Challenged</option>
                </select>
              </td>
              <td>
                <select
                  value={row.level}
                  onChange={(e) => handleChange(i, 'level', e.target.value)}
                >
                  <option>AC Level One</option>
                  <option>AC Level Two</option>
                  <option>DCFC</option>
                </select>
              </td>
              <td>
                <textarea
                  value={row.notes}
                  onChange={(e) => handleChange(i, 'notes', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={exportToExcel} className="export-btn">
        Export to Excel
      </button>
    </div>
  );
}
