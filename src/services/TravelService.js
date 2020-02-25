import BaseService from "./BaseServise";

class TravelService extends BaseService {
    list(params) {
        return this._get('search/en_us', {params: params} );
    }
}

export default new TravelService();