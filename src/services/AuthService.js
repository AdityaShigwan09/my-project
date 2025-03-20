import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = async (name, email, password, role = 'customer') => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password, role });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.access_token) {
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('userRole', response.data.role); 
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userRole'); 
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const getCurrentUserRole = () => {
  const userRole = localStorage.getItem('userRole');
  console.log("Retrieved user role from localStorage:", userRole);
  return userRole;
};