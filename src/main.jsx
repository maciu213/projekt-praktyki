import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import { Link } from "react-router-dom";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import axios from "axios";

function App() {
  const dialogRef = useRef();
  const dialogRef2 = useRef();
  const loginDialogRef = useRef();
  const taskDetailsDialogRef = useRef();

  const [dialogState, setDialogState] = useState({
    taskDialog: false,
    registerDialog: false,
    loginDialog: false,
    taskDetailsDialog: false,
  });
  const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
        login: '',
    });

  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    name: '',
    startdate: '',
    enddate: '',
    notes: '',
    category: 'low',
  });
  const [selectedTask, setSelectedTask] = useState(null);

  const [filters, setFilters] = useState({
    category: "all", 
    startDate: "", 
    endDate: "", 
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  
  const [error, setError] = useState(null);
  
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
    if (dialogType === "loginDialog") loginDialogRef.current.showModal();
  };

  const closeDialog = (dialogRef, dialogType) => {
    dialogRef.current.close();
    setDialogState({ ...dialogState, [dialogType]: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();


    console.log("Sending data: ", formData);
    console.log("Submitting form data:", formData); // Debugging line

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        // Display registration success message
        alert('Registration successful!');

        // Close the dialog (assuming closeDialog is the correct function)
        closeDialog(dialogRef2, "registerDialog");

        // Reset form fields
        setFormData({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });

    } catch (error) {
        // Handle errors (e.g., validation errors)
        setError(error.response?.data?.message || 'An error occurred!');
        console.error("Registration error:", error.response?.data);
    }
};
const handleAddTask = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('auth_token');

  if (!token) {
      alert('You must be logged in first!');
      return;}
  console.log("Submitting form data:", formData); // Debugging line
  try {
      const response = await axios.post("http://127.0.0.1:8000/api/tasks",{
              name: taskDetails.name,
              startdate: taskDetails.startdate,
              enddate: taskDetails.enddate,
              notes: taskDetails.notes,
              category: taskDetails.category,
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
              },
          }
      );

      alert("Task added successfully!");

      // Clear form after submission
      setTaskDetails({
          name: "",
          startdate: "",
          enddate: "",
          notes: "",
          category: "low",
      });

      closeDialog(dialogRef, "taskDialog"); // Close the task dialog

  } catch (error) {
      console.error("Error adding task:", error.response?.data);
      alert(error.response?.data?.message || "An error occurred!");
  }
};

const handleLogin = async (email, password) => {
  try {
      const response = await axios.post('http://localhost:8000/api/login', {
          email: loginDetails.email,
          password: loginDetails.password,
      }, {
          withCredentials: true, // If you need to send cookies or authentication headers
      });

      // Handle success (e.g., storing the token, redirecting user, etc.)
      console.log('Login success:', response.data);
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
      // Handle error (e.g., show error message)
      console.error('Error during login:', error);
  }
};


  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const openTaskDetailsDialog = (task) => {
    setSelectedTask(task);
    setDialogState({ ...dialogState, taskDetailsDialog: true });
    taskDetailsDialogRef.current.showModal();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch = filters.category === "all" || task.category === filters.category;

    const startDateMatch = !filters.startDate || new Date(task.startdate) >= new Date(filters.startDate);

    const endDateMatch = !filters.endDate || new Date(task.enddate) <= new Date(filters.endDate);

    return categoryMatch && startDateMatch && endDateMatch;
  });

  const handleEditTask = (task) => {
    // Set the selected task's details to the state so the dialog can be populated
    setTaskDetails({
      name: task.name,
      startdate: task.startdate,
      enddate: task.enddate,
      notes: task.notes,
      category: task.category,
    });
  
    // Open the task dialog for editing
    openDialog("taskDialog");
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
          <li className="sidebar-item">
            <Link to="/about">About Us</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>  <br /><br /><br /><br /><br /><br /><br /><br /><br /> 

        <div className="filter-section">
          <h3><strong>Filters</strong></h3>
          <div className="filter-item">
            <label className="priorityName">Priority</label><br />
            <select name="category" value={filters.category} onChange={handleFilterChange} className="select-dropdown">
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1><strong>To-do-list</strong></h1>
        </div>

        <button onClick={() => openDialog("taskDialog")} className="add">
          <strong><span className="plus-sign">+</span> Create task</strong>
        </button>

        <div className="task-board">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
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

      {/* Task Dialog */}
      <dialog ref={dialogRef} className={`dialogForm ${dialogState.taskDialog ? "show" : ""}`}>
        <form className="task-form"  onSubmit={handleAddTask}>
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
            <button className="submitButton" type="submit">Submit
            </button>
          </div>
        </form>
      </dialog>

      {/* Task Details Dialog */}
{selectedTask && (
  <dialog ref={taskDetailsDialogRef} className={`dialogForm ${dialogState.taskDetailsDialog ? "show" : ""}`}>
    <form className="task-form">
      <div className="form">
        <img
          src="/closeicon.png"
          className="closeIcon"
          onClick={() => closeDialog(taskDetailsDialogRef, "taskDetailsDialog")}
          alt="Close"
        />
        <strong id="formName">Edit Task</strong> <br /><br />

        {/* Editable Fields for Task Details */}
        <label className="formLabel">Name</label><br />
        <input
          type="text"
          name="name"
          value={taskDetails.name}
          onChange={handleInputChange}
        /><br />

        <label className="formLabel">Start Date</label><br />
        <input
          type="date"
          name="startdate"
          value={taskDetails.startdate}
          onChange={handleInputChange}
        /><br />

        <label className="formLabel">End Date</label><br />
        <input
          type="date"
          name="enddate"
          value={taskDetails.enddate}
          onChange={handleInputChange}
        /><br />

        <label className="formLabel">Notes</label><br />
        <textarea
          name="notes"
          value={taskDetails.notes}
          onChange={handleInputChange}
        ></textarea><br />

        <label className="formLabel">Priority</label><br />
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
          onClick={() => handleUpdateTask(selectedTask.id)} // Update task
          className="submitButton"
        >
          Save Changes
        </button>
      </div>
    </form>
  </dialog>
)}



      {/* Register Dialog */}
      <dialog ref={dialogRef2} className={`dialogForm ${dialogState.registerDialog ? "show" : ""}`}>
        <form className="task-form" onSubmit={handleRegisterSubmit}>
          <div className="form">
            <img
              src="/closeicon.png"
              className="closeIcon"
              onClick={() => closeDialog(dialogRef2, "registerDialog")}
              alt="Close"
            />
            <strong id="formName">Registration</strong> <br /><br />
            <label className="formLabel">Login</label>
            <input type="text" name="name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name}/>
            <label className="formLabel">Password</label>
            <input type="password" name="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password}/>
            <label className="formLabel">Re-enter password</label>
            <input type="password" name="password_confirmation" onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} required value={formData.password_confirmation}/>
            <label className="formLabel">E-mail</label>
            <input type="email" name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} /><br /><br />
            <button className="submitButton" type="submit">Submit</button>
          </div>
        </form>
      </dialog>

      {/* Login Dialog */}
      <dialog ref={loginDialogRef} className={`dialogForm ${dialogState.loginDialog ? "show" : ""}`}>
      <form className="task-form" onSubmit={(e) => {
          e.preventDefault();
            handleLogin(loginDetails.email, loginDetails.password);
            }}>
        <div className="form">
          <img
            src="/closeicon.png"
            className="closeIcon"
            onClick={() => closeDialog(loginDialogRef, "loginDialog")}
            alt="Close"
          />
          <strong id="formName">Log in</strong> <br /><br />
          <label className="formLabel">E-mail</label>
          <input 
            type="email" 
            name="email" 
            onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })} 
            value={loginDetails.email}
          />
          <label className="formLabel">Password</label>
          <input 
            type="password" 
            name="password" 
            onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} 
            value={loginDetails.password}
          /><br /><br />
          <button className="submitButton" type="submit">Submit</button>
        </div>
</form>

      </dialog>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
