const API_URL = 'https://api.musicorumapp.com/labs';
// const API_URL = 'http://localhost:4500/labs';

export default class MusicorumAPI {
  static async getMainstream(artists) {
    const base64 = btoa(JSON.stringify(artists))
    return fetch(`${API_URL}/artists?artists=${base64}`).then(r => r.json())
  }
}
