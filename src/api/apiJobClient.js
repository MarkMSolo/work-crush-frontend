import axios from 'axios';

const apiJobClient = axios.create({
  baseURL: 'http://localhost:9000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiJobClient;