import React from 'react';
import ReactDOM from 'react-dom/client';
import { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTaskPage from './AddTaskPage';
import RegisterLoginPage from './RegisterLoginPage';
import LoginRegisterPage from './LoginRegisterPage';
import Card from './components/Card';
import './style.css';

function App() {

  const dialogRef = useRef();
  const dialogRef2 = useRef();
  const dialogRef3 = useRef();

  const addTaskDialog = () => {
    dialogRef.current.showModal();
  }

  const registerShow = () => {
    dialogRef2.current.showModal();
  }

  const addTask = (event) => {
    event.preventDefault();
    console.log("klik");
  }

  const loginShow = () => {
    dialogRef3.current.showModal();
  }


  return (
    <div className="flex">
      <div className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-menu">
          <li className="sidebar-item" onClick={registerShow}>Register</li>
          <li className="sidebar-item" onClick={loginShow}>Log in</li>
          <li className="sidebar-item">Tasks</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>To-do-list</h1>
        </div>

        <button onClick={addTaskDialog} className="add">Add task</button>

            <label htmlFor="">Add your task clicking the button above.</label>

            <Card></Card>
            <Card title="karta1" description="dwdw"></Card>
            <Card title="karta2"></Card>
      </div>
      <dialog ref={dialogRef} className="dialogForm">
      <form className="task-form">
        <div className="form">
          <strong id="formname">Add Task</strong> <br></br><br></br>
          <label className="formLabel">Name <i>(Required)</i></label> <input type="text" name="name" /><br></br>
          <label className="formLabel">Date <i>(Required)</i></label> <input type="date" name="date" /><br></br>
          <label className="formLabel">Notes <i>(Optional)</i></label> <textarea name="notes" id="notes"></textarea><br></br>
          <label className="formLabel">Category <i>(Optional)</i></label> <br></br>
          <select name="category" id="category">
            <option value="" disabled selected class="text-gray-500">Select a task</option>
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
          </select> <br></br><br></br>

          <button className="submitButton" onClick={addTask}>Submit</button>
        </div>
      </form>
      </dialog>

      <dialog ref={dialogRef2}>
      <form className="task-form">
        <div className="form">
          <strong id="formname">Registration</strong> <br></br><br></br>
          <label className="formLabel">Login</label> <input type="text" name="name" /><br></br><br></br>
          <label className="formLabel">Password</label><input type="password" name="password" /><br></br> <br></br>
          <label className="formLabel">Re-enter password</label><input type="password" name="password" /><br></br> <br></br>
          <label className="formLabel">E-mail</label><input type="email" name="email" /><br></br> <br></br><br></br>
          <button className="submitButton">Submit</button>
        </div>
      </form>
      </dialog>

      <dialog ref={dialogRef3}>
      <form className="task-form">
        <div className="form">
          <strong id="formname">Log in</strong> <br></br><br></br>
          <label className="formLabel">Login</label> <input type="text" name="name" /><br></br><br></br>
          <label className="formLabel">Password</label><input type="password" name="password" /><br></br> <br></br>
          <label className="forgotPassword">Forgot password?</label><br></br><br></br>
          <button className="submitButton">Submit</button>
        </div>
      </form>
      </dialog>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/register-login" element={<RegisterLoginPage />} />
        <Route path="/login-register" element={<LoginRegisterPage/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
