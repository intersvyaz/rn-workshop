const METHOD_GET = "GET";
const METHOD_POST = "POST";
const API_GRAPHICS_URL = "http://thetvdb.com/banners/";
const API_POSTERS_URL = API_GRAPHICS_URL + "posters/";
export const API_URL = "https://api.thetvdb.com";
export const API_KEY = "51P59HCWHL5GJ46G";

class api {
  constructor() {
    this.token = null;
  }

  login = () => this._exec(METHOD_POST, "/login", {apikey: API_KEY});

  getSeriesDetails = id => this._exec(METHOD_GET, "/series/" + id + "/episodes");

  searchSeries = name => this._exec(METHOD_GET, "/search/series?name=" + name);

  getSeriesImage = id => API_POSTERS_URL + id + "-1.jpg";

  getEpisodeImage = name => API_GRAPHICS_URL + name;

  _exec = (method, path, body) => {
    const headers = {
      "Content-type": "application/json",
      "Accept": "application/json",
      "Accept-Language": "en",
    };
    if (this.token) {
      headers["Authorization"] = "Bearer " + this.token;
    }
    const options = {
      method: method,
      headers: headers,
    };
    if (method === METHOD_POST) {
      options.body = JSON.stringify(body);
    }
    console.log("Api executing", API_URL + path, options);
    return new Promise((resolve, reject) => {
      fetch(API_URL + path, options)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(response.status + " " + response._bodyText);
          }
        })
        .then(json => {
          console.log("Api response", json);
          resolve(json);
        })
        .catch(error => reject(error));
    })
  }
}
export default new api();