const API_URL = 'https://ws.audioscrobbler.com/2.0/';
const API_KEY = '0ae2a02cb6ec0686e560b365074020b3';

export default class LastfmAPI {
  static async request(method, params) {
    params.format = 'json';
    params.api_key = API_KEY;
    params.method = method;
    const urlParams = new URLSearchParams(params);
    return fetch(`${API_URL}?${urlParams.toString()}`).then(r => r.json())
  }

  static async getTopArtists(user, period = '1month', limit = 50) {
    return this.request('user.getTopArtists', {user, period, limit})
  }

  static async getLibraryArtists(user, limit = 50, page = 0) {
    return this.request('library.getArtists', { user, limit, page })
  }
}
