import { Binding } from "./utils/binding.js"
import { WeatherService } from "./service/weather.service.js";
class Main {

  // constructor() {
  //   const binding = new Binding(
  //     document.getElementById("testo") as HTMLInputElement,
  //     console.log
  //   );

  //   setInterval(() => {
  //     binding.setValue(Math.random().toString());
  //   }, 5000);
  // }

  private weatherService = new WeatherService();

  constructor() {
    this.weatherService.getWeather(41.54,12.28).then((log) => console.log(log)).catch(console.error);
  }
}

const main = new Main();