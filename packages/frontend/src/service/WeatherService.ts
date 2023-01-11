import {
  parseCurrentWeather,
  parseDailyWeather,
  parseHourlyWeather,
} from "../helper/weatherhelpers";
import axios from "axios";
import { User } from "weatherapp-common/src/model/userdataType";

const weatherURL =
  "https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true";
class WeatherService {
  // longitude: number;
  // latitude: number;
  // timezone: string;

  // constructor(longitude: number, latitude: number, timezone: string) {
  //   this.longitude = longitude;
  //   this.latitude = latitude;
  //   this.timezone = timezone;
  // }

  static getCurrentWeatherDetail(currentUser: User) {
    return axios
      .get(weatherURL, {
        params: {
          latitude: currentUser.latitude,
          longitude: currentUser.longitude,
          timezone: currentUser.timezone,
        },
      })
      .then(({ data }) => {
        // console.log(data);
        return {
          current: parseCurrentWeather(data),
          daily: parseDailyWeather(data),
          hourly: parseHourlyWeather(data),
        };
      });
  }

  static getLocalWeather(currentUser: User) {
    return axios
      .get("http://localhost:4001/api/home", {
        params: {
          latitude: currentUser.latitude,
          longitude: currentUser.longitude,
          timezone: currentUser.timezone,
        },
      })
      .then((res) => console.log(res));
  }
}

export default WeatherService;
