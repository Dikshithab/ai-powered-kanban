import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/Export.css";
function ExportPDF({ tasks = [] }) {

    const exportPDF = () => {

        const doc = new jsPDF();

        const currentDate = new Date().toLocaleDateString();

        // =========================
        // TITLE
        // =========================

        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("KanbanX Task Report", 14, 20);

        // =========================
        // REPORT INFO
        // =========================

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        doc.text(
            `Generated: ${currentDate}`,
            14,
            28
        );

        doc.text(
            `Total Tasks: ${tasks.length}`,
            14,
            34
        );

        // =========================
        // TABLE
        // =========================

        autoTable(doc, {
            startY: 42,

            head: [
                [
                    "Title",
                    "Status",
                    "Priority",
                    "Due Date"
                ]
            ],

            body: tasks.map(task => [
                task.title || "-",
                task.status || "-",
                task.priority || "-",
                task.dueDate || "-"
            ]),

            styles: {
                fontSize: 9,
                cellPadding: 4,
                valign: "middle"
            },

            headStyles: {
                fontSize: 10,
                fontStyle: "bold",
                halign: "center"
            },

            columnStyles: {
                0: {
                    cellWidth: 75
                },
                1: {
                    cellWidth: 35,
                    halign: "center"
                },
                2: {
                    cellWidth: 30,
                    halign: "center"
                },
                3: {
                    cellWidth: 35,
                    halign: "center"
                }
            },

            margin: {
                left: 14,
                right: 14
            }
        });

        // =========================
        // FOOTER
        // =========================

        const pageCount = doc.internal.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {

            doc.setPage(i);

            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");

            doc.text(
                `KanbanX • Page ${i} of ${pageCount}`,
                14,
                doc.internal.pageSize.height - 10
            );
        }

        // =========================
        // DOWNLOAD
        // =========================

        doc.save("KanbanX-Tasks.pdf");
    };

    return (
        <button
            className="export-btn"
            onClick={exportPDF}
        >
            📄 Export PDF
        </button>
    );
}

export default ExportPDF;