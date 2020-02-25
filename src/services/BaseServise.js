import axios from 'axios';
import config from "../config/appConfig";

export default class BaseService {
    basePath = config.API + '/virail/v7/';

    _get(url, config) {
        return axios.get(this.basePath + url, config);
    }

    _post(url, data, config) {
        return axios.post(this.basePath + url, data, config);
    }

    _put(url, data, config) {
        return axios.put(this.basePath + url, data, config);
    }

    _delete(url) {
        return axios.delete(this.basePath + url);
    }
}
