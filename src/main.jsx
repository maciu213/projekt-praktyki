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
          <h1>To-do-list</h1>
        </div>

        <button onClick={() => openDialog("taskDialog")} className="add">
          Add task
        </button>

        <label>Add your task by clicking the button above.</label>
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
            <strong id="formName">Add Task</strong> <br />
            <label className="formLabel">Name (Required)</label>
            <input type="text" name="name" />
            <label className="formLabel">Date (Required)</label>
            <input type="date" name="date" />
            <label className="formLabel">Notes (Optional)</label>
            <textarea name="notes" id="notes"></textarea>
            <label className="formLabel">Category (Optional)</label>
            <select name="category" id="category">
              <option value="" disabled selected>Select a task</option>
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
            </select>
            <button className="submitButton">Submit</button>
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
            <strong id="formName">Registration</strong> <br />
            <label className="formLabel">Login</label>
            <input type="text" name="name" />
            <label className="formLabel">Password</label>
            <input type="password" name="password" />
            <label className="formLabel">Re-enter password</label>
            <input type="password" name="password" />
            <label className="formLabel">E-mail</label>
            <input type="email" name="email" />
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
            <strong id="formName">Log in</strong> <br />
            <label className="formLabel">Login</label>
            <input type="text" name="name" />
            <label className="formLabel">Password</label>
            <input type="password" name="password" />
            <label className="forgotPassword">Forgot password?</label>
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
