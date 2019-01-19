import axios from 'axios';
import { showNotification } from './actions';

const demoApi = {};

const fakeAxios = (body, fail = false, warn = false,) => {
    console.log('Fake axios made with', body);
    return () => new Promise((resolve, reject) => {
        if(warn) showNotification('Demo mode; not saved', 'warning');
        if(fail) reject();
        else resolve({ data: body });
    });
}

const warnDemo = (fail = false) => {
    return fakeAxios({}, fail, true);
}

demoApi.getConfig = fakeAxios({
    port: 1225,
    gpioPinNumbers: [ 5, 17, 18, 27, 22, 23, 24, 25 ],
    invertPinOutput: false,
    useBoardPinNumbering: false,
    gpioLogging: true,
    interShowDelay: 5,
    autoStart: false,
    autoStartTime: 1020, // 5 PM
    autoEndTime: 0, // Midnight
});

demoApi.getShows = fakeAxios([
    {
        name: 'wizards_in_winter',
        displayName: 'Wizards in Winter',
        hasSource: true,
        hasAudio: true,
    },
    {
        name: 'music_box_dancer',
        displayName: 'Music Box Dancer',
        hasSource: true,
        hasAudio: true,
    }
]);

demoApi.getShowProject = name => new Promise((resolve, reject) => {
    axios.get(`/demo/${name}.json`)
        .then(res => {
            resolve({ data: { project: res.data } });
        })
        .catch(reject);
})
demoApi.audioPath = name => `/demo/${name}.mp3`;

demoApi.setConfig = warnDemo();
demoApi.createShow = warnDemo(true);
demoApi.createShowAudio = warnDemo(true);
demoApi.editShow = warnDemo();
demoApi.saveShowProject = warnDemo(true);
demoApi.deleteShow = warnDemo();

export default demoApi;