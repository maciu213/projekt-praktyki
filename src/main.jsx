import React, { useRef, useState } from "react";
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
    loginDialog: false
  });

  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    date: "",
    notes: "",
    category: "low"
  });

  const openDialog = (dialogType) => {
    setDialogState({ ...dialogState, [dialogType]: true });
    dialogType === "taskDialog" && dialogRef.current.showModal();
    dialogType === "registerDialog" && dialogRef2.current.showModal();
    dialogType === "loginDialog" && dialogRef3.current.showModal();
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
    setTasks([...tasks, taskDetails]);
    setTaskDetails({ name: "", date: "", notes: "", category: "low" });
    closeDialog(dialogRef, "taskDialog");
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
          Add task
        </button>

        <div className="task-board">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={index} className={`task-item ${task.category}`}>
                <div className="task-name">{task.name}</div>
                <div className="task-date">{task.date}</div>
                <div className="task-notes">{task.notes}</div>
              </div>
            ))
          ) : (
            <p id="addTaskText">No tasks added yet. Please add a task!</p>
          )}
        </div>
      </div>

      <footer className="footer bg-gray-800 text-white mt-auto p-1">
        <div className="footer-content max-w-screen-xl mx-auto text-center">
          <p>&copy; To-do list.</p>
          <div className="footer-links mt-4">
            <a href="/privacy-policy" className="text-blue-400 hover:underline mx-3">Privacy Policy</a>
            <a href="/terms-of-service" className="text-blue-400 hover:underline mx-3">Terms of Service</a>
            <a href="/contact" className="text-blue-400 hover:underline mx-3">Contact Us</a>
          </div>
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
            <input 
              type="text" 
              name="name" 
              value={taskDetails.name} 
              onChange={handleInputChange} 
            /><br />
            <label className="formLabel">Date (Required)</label><br />
            <input 
              type="date" 
              name="date" 
              value={taskDetails.date} 
              onChange={handleInputChange} 
            /><br />
            <label className="formLabel">Notes (Optional)</label><br />
            <textarea 
              name="notes" 
              value={taskDetails.notes} 
              onChange={handleInputChange} 
            ></textarea><br />
            <label className="formLabel">Category (Optional)</label><br />
            <select 
              name="category" 
              value={taskDetails.category} 
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select><br /><br />
            <button 
              type="button" 
              onClick={handleAddTask} 
              className="submitButton"
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>

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
            <input type="password" name="password" />
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
