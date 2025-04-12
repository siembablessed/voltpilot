import { CSVLink } from "react-csv";

export default function ExportCSV({ data, filename }) {
  return (
    <div className="export-btn">
      <CSVLink data={data} filename={filename} className="btn">
        Export CSV
      </CSVLink>
    </div>
  );
}
