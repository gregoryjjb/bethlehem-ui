import axios from 'axios';

const axApi = axios.create({ baseURL: '/api' });

const api = {};

api.getConfig = () => axApi.get('/config');

api.setConfig = config => axApi.put('/config', config);

export default api;