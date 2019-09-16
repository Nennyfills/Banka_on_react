import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/api/v1';
const BASE_URL = 'https://banka-nenny.herokuapp.com/api/v1';

const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
});

export default AXIOS_INSTANCE;
