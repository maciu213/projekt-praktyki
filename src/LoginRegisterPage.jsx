import React from 'react';
import './style.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function LoginRegisterPage() {
  return (
    <div className="background-container">
      <form className="task-form">
        <div className="form">
          <strong id="formname">Log in</strong> <br></br><br></br>
          <label className="formLabel">Login</label> <input type="text" name="name" /><br></br><br></br>
          <label className="formLabel">Password</label><input type="password" name="password" /><br></br> <br></br>
          <label className="forgotPassword">Forgot password?</label><br></br><br></br>
          <button className="submitButton">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default LoginRegisterPage;
