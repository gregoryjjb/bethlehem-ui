import axios from 'axios';

const axApi = axios.create({ baseURL: '/api' });

const api = {};

api.getConfig = () => axApi.get('/config');

api.setConfig = config => axApi.put('/config', config);

api.getShows = () => axApi.get('/shows');

api.editShow = show => axApi.put(`shows/${show.name}`, show);

export default api;