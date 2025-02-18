import React from 'react';
import './style.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function AddTaskPage() {
  return (
    <div className="background-container">
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

          <button className="submitButton">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskPage;
