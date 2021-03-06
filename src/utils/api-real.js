import axios from 'axios';

const axApi = axios.create({ baseURL: '/api' });

const api = {};

api.getConfig = () => axApi.get('/config');

api.setConfig = config => axApi.put('/config', config);

api.getShows = () => axApi.get('/shows');

api.getShowProject = name => axApi.get(`/shows/${name}/project`);

api.audioPath = name => `/api/shows/${name}/audio`

api.createShow = name => axApi.post('/shows', { name });

api.createShowAudio = (name, audioFile) => {
    const fd = new FormData();
    fd.append('file', audioFile);
    return axApi.post(
        `/shows/${name}/audio`,
        fd,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
}

api.editShow = show => axApi.put(`shows/${show.name}`, show);

api.saveShowProject = (name, project) => axApi.post(`shows/${name}/project`, { project });

api.deleteShow = name => axApi.delete(`shows/${name}`);

export default api;