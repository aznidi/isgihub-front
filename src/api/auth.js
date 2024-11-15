import axios from 'axios';

export const login = async (email, password) => {
  return axios.post('/api/login', { email, password });
};

export const register = async (userData) => {
  return axios.post('/api/register', userData);
};

export const logout = async () => {
  return axios.post('/api/logout');
};
