export default class PathBuilder {
  baseUrl;
  params = [];
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  addParam(name, value) {
    this.params.push([name, value]);
    return this;
  }
  build() {
    let paramStr = this.params.map(([name, value]) => `${name}=${value}`);
    paramStr = paramStr.join("&");

    return `${this.baseUrl}?${paramStr}`;
  }
}
