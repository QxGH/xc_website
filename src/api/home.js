// import requestUrl from 'request/requestUrl';
import axios from 'request/';

const home = {
  index(data) {
    return axios.post('/home', data)
  }
}

export default home;