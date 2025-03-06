import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Laravel API base URL

// User Authentication
export const registerUser = (userData) => axios.post(`${API_BASE_URL}/register`, userData);
export const loginUser = (userData) => axios.post(`${API_BASE_URL}/login`, userData);

// Task Management
export const fetchTasks = () => axios.get(`${API_BASE_URL}/tasks`);
export const addTask = (taskData) => axios.post(`${API_BASE_URL}/tasks`, taskData);
export const deleteTask = (taskId) => axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
