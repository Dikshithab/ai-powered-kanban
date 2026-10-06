import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportTasksPDF = (tasks) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Kanban Tasks", 14, 20);

  autoTable(doc, {
    head: [["Title", "Status", "Priority", "Due Date"]],
    body: tasks.map(task => [
      task.title,
      task.status,
      task.priority,
      task.dueDate || "-"
    ]),
    startY: 30,
  });

  doc.save("kanban-tasks.pdf");
};
<button onClick={() => exportTasksPDF(tasks)}>
    Export PDF
</button>