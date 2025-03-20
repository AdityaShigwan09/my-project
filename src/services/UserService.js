import axios from 'axios';
import { getCurrentUser } from './AuthService';

const API_URL = 'http://localhost:5000';

export const getUsers = async () => {
  const user = getCurrentUser();
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${user.access_token}`
    }
  });
  return response.data;
};