import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/pets';

export const getPets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPet = async (petData) => {
  const response = await axios.post(API_URL, petData);
  return response.data;
};

export const updatePet = async (id, petData) => {
  const response = await axios.put(`${API_URL}/${id}`, petData);
  return response.data;
};

export const deletePet = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
