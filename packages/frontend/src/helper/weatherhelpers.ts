import moment from "moment";
import { CurrentWeather } from "weatherapp-common/src/currentWeatherType";
import { ForecastWeather } from "weatherapp-common/src/forecastWeatherType";

export function parseCurrentWeather({
  current_weather,
  daily,
}): CurrentWeather {
  const {
    temperature,
    windspeed: windSpeed,
    weathercode: weatherCode,
  } = current_weather;
  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
    precipitation_sum: [precip],
  } = daily;
  return {
    temperature,
    highTemp: maxTemp,
    lowTemp: minTemp,
    highFeelsLike: maxFeelsLike,
    lowFeelsLike: minFeelsLike,
    windSpeed,
    precip,
    weatherCode,
  };
}

export function parseDailyWeather({ daily }: unknown) {
  return daily.time.map((time, index) => {
    return {
      time,
      weatherCode: daily.weathercode[index],
      maxTemp: daily.temperature_2m_max[index],
      minTemp: daily.temperature_2m_min[index],
    };
  });
}

export function parseHourlyWeather({ hourly, current_weather }) {
  return hourly.time
    .map((time, index) => {
      return {
        time,
        weatherCode: hourly.weathercode[index],
        temperature: hourly.temperature_2m[index],
        feelsLike: hourly.apparent_temperature[index],
        windSpeed: hourly.windspeed_10m[index],
        precip: hourly.precipitation[index],
      };
    })
    .filter(({ time }) => moment(time) >= moment(current_weather.time));
}
