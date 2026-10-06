import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import EditTask from "../components/EditTask";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ExportPDF from "../components/ExportPDF";
import ExportCSV from "../components/ExportCSV";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../styles/BoardDetails.css";
import AITaskBreakdown from "../components/AITaskBreakdown";
import AIProjectHealth from "../components/AIProjectHealth";

function BoardDetails() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadBoard();
  }, [id]);

const createTask = async (task) => {
  try {
    const taskData = {
      title: task.title,
      description: task.description || "",
      status: task.status || "TODO",
      priority: task.priority || "MEDIUM",
      dueDate: task.dueDate || null,
      boardId: Number(id),
    };

    console.log("Creating task:", taskData);

    if (!id) {
      toast.error("Board ID is missing");
      return;
    }

    await api.post("/tasks/", taskData);

    toast.success("Task Created");
    await loadBoard();
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("ERROR:", error);

    toast.error(
      error.response?.data?.detail ||
      error.response?.data?.error ||
      "Failed to create task"
    );
  }
};

const loadBoard = async () => {
  try {
    const response = await api.get(`/boards/${id}/`);
    setBoard(response.data);
  } catch (error) {
    console.error("Failed to load board:", error);
    toast.error("Failed to load board");
  }
};


const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}/`);

    toast.success("Task Deleted");
    await loadBoard();
  } catch (error) {
    console.error(
      "Delete Failed:",
      error.response?.data || error.message
    );

    toast.error("Delete Failed");
  }
};


const updateStatus = async (taskId, status) => {
  const task = board.tasks.find((t) => t.id === taskId);

  if (!task) return;

  try {
    await api.put(`/tasks/${taskId}/`, {
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      dueDate: task.dueDate || null,
      status: status,
    });

    toast.success("Status Updated");
    await loadBoard();
  } catch (error) {
    console.error(
      "Status Update Failed:",
      error.response?.data || error.message
    );

    toast.error("Update Failed");
  }
};


const updateTask = async (task) => {
  try {
    await api.put(`/tasks/${task.id}/`, task);

    setSelectedTask(null);

    toast.success("Task Updated");
    await loadBoard();
  } catch (error) {
    console.error(
      "Update Failed:",
      error.response?.data || error.message
    );

    toast.error("Update Failed");
  }
};


  const onDragEnd = (result) => {
    if (!result.destination) return;
    const source = result.source.droppableId;
    const destination = result.destination.droppableId;

    if (source === destination) return;

    updateStatus(Number(result.draggableId), destination);
  };

  if (!board) {
    return (
      <>
        <Sidebar />
        <Navbar />
        <div className="board-page">
          <Loader />
        </div>
      </>
    );
  }

  const todoTasks = (board.tasks || []).filter(
  (task) => task.status === "TODO"
);

const inProgressTasks = (board.tasks || []).filter(
  (task) => task.status === "IN_PROGRESS"
);

const doneTasks = (board.tasks || []).filter(
  (task) => task.status === "DONE"
);

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="board-page">
        <div className="board-header">
          <h1>{board.name}</h1>
        </div>

        <div className="board-tools">
          <div className="board-tools-left">
            <AddTask boardId={board.id} onCreate={createTask} />
          </div>
          <div className="board-tools-right">
            <ExportPDF tasks={board.tasks} />
            <ExportCSV tasks={board.tasks} />
          </div>
        </div>
        <AITaskBreakdown
  boardId={board.id}
  onTasksCreated={loadBoard}
/>
<AIProjectHealth
  boardId={board.id}
/>
        {selectedTask && (
          <EditTask
            task={selectedTask}
            onSave={updateTask}
            onCancel={() => setSelectedTask(null)}
          />
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board-columns">
            {/* ================= TODO COLUMN ================= */}
            <Droppable droppableId="TODO">
              {(provided, snapshot) => (
                <div
                  className={`board-column todo ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
<h2 className="column-title">
    📝 TODO
    <span className="column-count">
        {todoTasks.length}
    </span>
</h2>                  {todoTasks.length === 0 ? (
                    <p className="empty-column">No Tasks</p>
                  ) : (
                    todoTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`draggable-task-wrapper ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            <TaskCard
                              task={task}
                              onDelete={deleteTask}
                              onUpdate={updateStatus}
                              onEdit={setSelectedTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* ================= IN PROGRESS COLUMN ================= */}
            <Droppable droppableId="IN_PROGRESS">
              {(provided, snapshot) => (
                <div
                  className={`board-column progress ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
<h2 className="column-title">
     🔄 IN PROGRESS
    <span className="column-count">
        {inProgressTasks.length}
    </span>
</h2>                  {inProgressTasks.length === 0 ? (
                    <p className="empty-column">No Tasks</p>
                  ) : (
                    inProgressTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`draggable-task-wrapper ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            <TaskCard
                              task={task}
                              onDelete={deleteTask}
                              onUpdate={updateStatus}
                              onEdit={setSelectedTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* ================= DONE COLUMN ================= */}
            <Droppable droppableId="DONE">
              {(provided, snapshot) => (
                <div
                  className={`board-column done ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
<h2 className="column-title">
    ✅ DONE
    <span className="column-count">
        {doneTasks.length}
    </span>
</h2>                  {doneTasks.length === 0 ? (
                    <p className="empty-column">No Tasks</p>
                  ) : (
                    doneTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`draggable-task-wrapper ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            <TaskCard
                              task={task}
                              onDelete={deleteTask}
                              onUpdate={updateStatus}
                              onEdit={setSelectedTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default BoardDetails;
