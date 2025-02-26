import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";

function App() {
  const dialogRef = useRef();
  const dialogRef2 = useRef();
  const dialogRef3 = useRef();

  const [dialogState, setDialogState] = useState({
    taskDialog: false,
    registerDialog: false,
    loginDialog: false,
    taskDetailsDialog: false, // State for task details dialog
  });

  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    startdate: "",
    enddate: "",
    notes: "",
    category: "low",
  });
  const [selectedTask, setSelectedTask] = useState(null); // State for selected task

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const openDialog = (dialogType) => {
    setDialogState({ ...dialogState, [dialogType]: true });
    if (dialogType === "taskDialog") dialogRef.current.showModal();
    if (dialogType === "registerDialog") dialogRef2.current.showModal();
    if (dialogType === "loginDialog") dialogRef3.current.showModal();
  };

  const closeDialog = (dialogRef, dialogType) => {
    dialogRef.current.close();
    setDialogState({ ...dialogState, [dialogType]: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleAddTask = () => {
    if (!taskDetails.name || !taskDetails.startdate || !taskDetails.enddate) {
      alert("Name and Date are required!");
      return;
    }

    const newTasks = [...tasks, taskDetails];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setTaskDetails({ name: "", startdate: "", enddate: "", notes: "", category: "low" });
    closeDialog(dialogRef, "taskDialog");
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const openTaskDetailsDialog = (task) => {
    setSelectedTask(task);
    setDialogState({ ...dialogState, taskDetailsDialog: true });
    dialogRef3.current.showModal();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-menu">
          <li className="sidebar-item" onClick={() => openDialog("registerDialog")}>
            Register
          </li>
          <li className="sidebar-item" onClick={() => openDialog("loginDialog")}>
            Log in
          </li>
          <li className="sidebar-item">Tasks</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h1><strong>To-do-list</strong></h1>
        </div>

        <button onClick={() => openDialog("taskDialog")} className="add">
          <strong><span className="plus-sign">+</span> Create task</strong>
        </button>

        <div className="task-board">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={index} className={`task-item ${task.category}`} onClick={() => openTaskDetailsDialog(task)}>
                <div className="task-name">{task.name}</div>
                <div className="task-startdate"><p>Start: </p>{task.startdate}</div>
                <div className="task-enddate"><p>End: </p>{task.enddate}</div>
                <div className="task-notes">{task.notes}</div><br />
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemoveTask(index); }}
                  className="remove-button"
                >
                  Remove Task
                </button>
              </div>
            ))
          ) : (
            <p id="addTaskText">No tasks added yet. Please add a task!</p>
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; To-do list.</p>
        </div>
      </footer>

      {/* Add Task Dialog */}
      <dialog ref={dialogRef} className={`dialogForm ${dialogState.taskDialog ? "show" : ""}`}>
        <form className="task-form">
          <div className="form">
            <img
              src="/closeicon.png"
              className="closeIcon"
              onClick={() => closeDialog(dialogRef, "taskDialog")}
              alt="Close"
            />
            <strong id="formName">Add Task</strong> <br /><br />
            <label className="formLabel">Name (Required)</label><br />
            <input type="text" name="name" value={taskDetails.name} onChange={handleInputChange} /><br />
            <label className="formLabel">Start (Required)</label><br />
            <input type="date" name="startdate" value={taskDetails.startdate} onChange={handleInputChange} /><br />
            <label className="formLabel">End (Required)</label><br />
            <input type="date" name="enddate" value={taskDetails.enddate} onChange={handleInputChange} /><br />
            <label className="formLabel">Notes (Optional)</label><br />
            <textarea name="notes" value={taskDetails.notes} onChange={handleInputChange}></textarea><br />
            <label className="formLabel">Priority (Optional)</label><br />
            <select name="category" value={taskDetails.category} onChange={handleInputChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select><br /><br />
            <button type="button" onClick={handleAddTask} className="submitButton">
              Submit
            </button>
          </div>
        </form>
      </dialog>

      {/* Task Details Dialog */}
      {selectedTask && (
        <dialog ref={dialogRef3} className={`dialogForm ${dialogState.taskDetailsDialog ? "show" : ""}`}>
          <div className="modal-overlay">
            <div className="modal">
              <img
                src="/closeicon.png"
                className="closeIcon"
                onClick={() => closeDialog(dialogRef3, "taskDetailsDialog")}
                alt="Close"
              />
              <strong id="formName">Task Details</strong>
              <div className="task-details-content">
                <p><strong>Name:</strong> {selectedTask.name}</p>
                <p><strong>Start Date:</strong> {selectedTask.startdate}</p>
                <p><strong>End Date:</strong> {selectedTask.enddate}</p>
                <p><strong>Notes:</strong> {selectedTask.notes}</p>
                <p><strong>Priority:</strong> {selectedTask.category}</p>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {/* Register Dialog */}
      <dialog ref={dialogRef2} className={`dialogForm ${dialogState.registerDialog ? "show" : ""}`}>
        <form className="task-form">
          <div className="form">
            <img
              src="/closeicon.png"
              className="closeIcon"
              onClick={() => closeDialog(dialogRef2, "registerDialog")}
              alt="Close"
            />
            <strong id="formName">Registration</strong> <br /><br />
            <label className="formLabel">Login</label>
            <input type="text" name="name" />
            <label className="formLabel">Password</label>
            <input type="password" name="password" />
            <label className="formLabel">Re-enter password</label>
            <input type="password" name="confirmPassword" />
            <label className="formLabel">E-mail</label>
            <input type="email" name="email" /><br /><br />
            <button className="submitButton">Submit</button>
          </div>
        </form>
      </dialog>

      {/* Login Dialog */}
      <dialog ref={dialogRef3} className={`dialogForm ${dialogState.loginDialog ? "show" : ""}`}>
        <form className="task-form">
          <div className="form">
            <img
              src="/closeicon.png"
              className="closeIcon"
              onClick={() => closeDialog(dialogRef3, "loginDialog")}
              alt="Close"
            />
            <strong id="formName">Log in</strong> <br /><br />
            <label className="formLabel">Login</label>
            <input type="text" name="name" />
            <label className="formLabel">Password</label>
            <input type="password" name="password" /><br /><br />
            <label className="forgotPassword">Forgot password?</label><br /><br />
            <button className="submitButton">Submit</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
