class HttpClass {
  mainUrl = "";

  url = {};

  headers = {};

  dataFetch = {};

  // Dev
  constructor(mainUrl = "http://localhost:80") {

  // Build
  // constructor(mainUrl = "http://www.intuitionstudio.co/porto_backend/public") {
    this.mainUrl = mainUrl;
  }

  /**
   * Enviar una solicitud post a la url establecida.
   * @param {String} url Direccion a enviarse la solicitud
   * @param {any} data Objecto de datos que se enviaran.
   * @param {any} headers? Objeto headers. Si se deja vacio o en false, tomará 'Content-Type' application/json.
   */
  post(url, data, headers = false) {
    let dataFetch = {
      method: "post",
      headers: headers,
      body: JSON.stringify(data)
    };
    this.setData(dataFetch);
    this.setUrl(url);
    this.setHeaders(headers);
    return this._createFetch();
  }

  async get(url, headers = false) {
    let dataFetch = {
      method: "get"
    };
    this.setData(dataFetch);
    this.setUrl(url);
    this.setHeaders(headers);
    return await this._createFetch();
  }

  /**
   * Agregar una url para enviar una petición.
   * @param {string} url Url a la cual se enviará la peticion.
   */
  setUrl(url) {
    this.url = url;
  }

  /**
   * Datos de Body que se enviarán por peticion FETCH.
   * Tenga en cuenta, que este método no remplazará los headers si se han declarado.
   * @param {any} data Datos clave:valor, para enviar a una url en especifica.
   */
  setData(data) {
    this.dataFetch = data;
  }

  /**
   * Agregar los headers que se enviarán a la petición
   * @param {any} headers Ojeto de headers.
   */
  setHeaders(headers = false) {
    if (!headers) {
      this.headers = {
        "Content-Type": "application/json; charset=utf-8"
      };
    } else {
      this.headers = headers;
    }
  }

  async _createFetch() {
    this.dataFetch["headers"] = this.headers;
    let fullUrl = this.mainUrl + "/" + this.url;
    return await fetch(fullUrl, this.dataFetch)
      .then(reponse => reponse.json())
      .then(json => json);
  }
}

export default HttpClass;
