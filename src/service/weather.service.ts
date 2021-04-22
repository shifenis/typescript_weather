
export class WeatherService {
  private readonly URL = "https://www.metaweather.com";
  private readonly PROXY = "https://cors-anywhere.herokuapp.com";


  private http: XMLHttpRequest;

  constructor() {
    this.http = new XMLHttpRequest();
    this.http.responseType = "json";
  }

  public getWeather(
    longitude: number,
    latitude: number
  ) {
    return this.getLocation(longitude, latitude).then((locationID) => console.log(locationID));
  }

  private getLocation(longitude: number, latitude: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.GET<Array<any>, any>(`${this.URL}`, { lattlong: `${longitude},${latitude}` }).then((response) => resolve(response[0].woeid));
    })
  }

  private GET<T, K>(url: string, params?: K): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == 200) {
          return resolve(this.response);
        }
        if (this.readyState === 4 && this.status !== 200) {
          return reject(this.response);
        }

      };
      this.http.open("GET", `${this.PROXY}/${this.URL}/api/location/search/?${this.serializeQueryParams(params)}`, true);
      this.http.send();
    })
  }

  private serializeQueryParams<T>(params: T): string {
    switch (typeof params) {
      case 'object':
        let finalParam: string = '';
        Object.entries(params).forEach(([key, value]) => finalParam += `${key}=${value}&`);
        return finalParam.slice(0, -1);
      case 'string':
        return params as any as string;
      default:
        throw new Error("not a string or object");
    }
  }



}