import React from 'react';
import './style.css';

function AddTaskPage() {
  return (
    <div className="background-container">
      <form className = "task-form">
        Imie<input type="text" name="name" id="name"/>
      </form>
    </div>
  );
}

export default AddTaskPage;
