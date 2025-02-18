import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTaskPage from './AddTaskPage';
import RegisterLoginPage from './RegisterLoginPage';
import LoginRegisterPage from './LoginRegisterPage';
import './style.css';

function App() {
  return (
    <div className="flex">
      <div className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-menu">
          <li><Link to="/register-login" className="sidebar-item">Register</Link></li>
          <li><Link to="/login-register" className="sidebar-item">Login</Link></li>
          <li><a href="#" className="sidebar-item">Tasks</a></li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>To-do-list</h1>
        </div>

        <Link to="/add-task" className="add">Add task</Link>

        <table>
          <tbody>
            <label htmlFor="">Add your task clicking the button above.</label>
          </tbody>
        </table>
      </div>
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
