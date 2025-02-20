import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTaskPage from "./AddTaskPage";
import RegisterLoginPage from "./RegisterLoginPage";
import LoginRegisterPage from "./LoginRegisterPage";
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

  return (
    <div className="flex">
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
          <h1>To-do-list</h1>
        </div>

        <button onClick={() => openDialog("taskDialog")} className="add">
          Add task
        </button>

        <label>Add your task by clicking the button above.</label>
      </div>

      {/* Add Task Dialog */}
      <dialog ref={dialogRef} className={`dialogForm ${dialogState.taskDialog ? "show" : ""}`} id="dialogs">
        <form className="task-form">
          <div className="form">
            <img
              src="/closeicon.png"
              className="closeIcon"
              onClick={() => closeDialog(dialogRef, "taskDialog")}
              alt="Close"
            />
            <strong id="formname">Add Task</strong> <br />
            <br />
            <label className="formLabel">Name (Required)</label>
            <input type="text" name="name" />
            <br />
            <label className="formLabel">Date (Required)</label>
            <input type="date" name="date" />
            <br />
            <label className="formLabel">Notes (Optional)</label>
            <textarea name="notes" id="notes"></textarea>
            <br />
            <label className="formLabel">Category (Optional)</label> <br />
            <select name="category" id="category">
              <option value="" disabled selected>
                Select a task
              </option>
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
            </select>
            <br />
            <br />
            <button className="submitButton">Submit</button>
          </div>
        </form>
      </dialog>

      {/* Register Dialog */}
      <dialog ref={dialogRef2} className={`dialogForm ${dialogState.registerDialog ? "show" : ""}`} id="dialogs">
        <form className="task-form">
          <div className="form">
            <img
              src="/closeicon.png"
              className="closeIcon"
              onClick={() => closeDialog(dialogRef2, "registerDialog")}
              alt="Close"
            />
            <strong id="formname">Registration</strong> <br />
            <br />
            <label className="formLabel">Login</label>
            <input type="text" name="name" />
            <br />
            <br />
            <label className="formLabel">Password</label>
            <input type="password" name="password" />
            <br />
            <br />
            <label className="formLabel">Re-enter password</label>
            <input type="password" name="password" />
            <br />
            <br />
            <label className="formLabel">E-mail</label>
            <input type="email" name="email" />
            <br />
            <br />
            <br />
            <button className="submitButton">Submit</button>
          </div>
        </form>
      </dialog>

      {/* Login Dialog */}
      <dialog ref={dialogRef3} className={`dialogForm ${dialogState.loginDialog ? "show" : ""}`} id="dialogs">
        <form className="task-form">
          <div className="form">
            <img
              src="/closeicon.png"
              className="closeIcon"
              onClick={() => closeDialog(dialogRef3, "loginDialog")}
              alt="Close"
            />
            <strong id="formname">Log in</strong> <br />
            <br />
            <label className="formLabel">Login</label>
            <input type="text" name="name" />
            <br />
            <br />
            <label className="formLabel">Password</label>
            <input type="password" name="password" />
            <br />
            <br />
            <label className="forgotPassword">Forgot password?</label>
            <br />
            <br />
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
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/register-login" element={<RegisterLoginPage />} />
        <Route path="/login-register" element={<LoginRegisterPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
