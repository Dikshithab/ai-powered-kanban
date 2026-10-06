import { saveAs } from "file-saver";
import "../styles/Export.css";

function ExportCSV({ tasks }) {

    const exportCSV = () => {
    const headers = [
        "Title",
        "Status",
        "Priority",
        "Due Date"
    ];

    const escapeCSV = (value) => {
        const text = String(value ?? "");

        if (
            text.includes(",") ||
            text.includes('"') ||
            text.includes("\n")
        ) {
            return `"${text.replace(/"/g, '""')}"`;
        }

        return text;
    };

    const rows = tasks.map(task => [
        task.title,
        task.status,
        task.priority,
        task.dueDate || "-"
    ]);

    const csv = [headers, ...rows]
        .map(row => row.map(escapeCSV).join(","))
        .join("\n");

    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8;" }
    );

    saveAs(blob, "KanbanX-Tasks.csv");
};

    return (
        <button
            className="export-btn"
            onClick={exportCSV}
        >
            📊 Export CSV
        </button>
    );
}

export default ExportCSV;