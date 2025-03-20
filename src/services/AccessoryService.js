import axios from 'axios';

const API_URL = 'http://localhost:5000';


export const getAccessories = async () => {
  const response = await axios.get(`${API_URL}/accessories`);
  return response.data;
};


export const getAccessoryById = async (id) => {
  const response = await axios.get(`${API_URL}/accessories/${id}`);
  return response.data;
};


export const addAccessory = async (accessory) => {
  const response = await axios.post(`${API_URL}/accessories`, accessory);
  return response.data;
};


export const updateAccessory = async (id, accessory) => {
  const response = await axios.put(`${API_URL}/accessories/${id}`, accessory);
  return response.data;
};


export const deleteAccessory = async (id) => {
  const response = await axios.delete(`${API_URL}/accessories/${id}`);
  return response.data;
};
