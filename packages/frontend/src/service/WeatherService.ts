import axios from "axios";

const weatherURL =
  "https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true";
class WeatherService {
  longitude: number;
  latitude: number;
  timezone: string;

  constructor(longitude: number, latitude: number, timezone: string) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.timezone = timezone;
  }

  static getCurrentWeatherDetail(long: number, lat: number, timezone: string) {
    return axios
      .get(weatherURL, {
        params: {
          latitude: lat,
          longitude: long,
          timezone: timezone,
        },
      })
      .then((res) => res.data);
  }
}

export default WeatherService;
