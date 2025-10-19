import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // backend URL

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Test function to get all tasks
export async function getAllTasks() {
  try {
    const response = await api.get('/tasks');
    console.log('Fetched tasks:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}
