import realApi from './api-real';
import demoApi from './api-demo';

let exp;
const DEMO = process.env.REACT_APP_DEMO_MODE === 'true';

if(DEMO) {
    exp = demoApi;
}
else {
    exp = realApi;
}

export default exp;