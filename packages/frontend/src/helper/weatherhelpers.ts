import moment from "moment";
import { CurrentWeather } from "weatherapp-common/src/model/currentWeatherType";
import { ForecastWeather } from "weatherapp-common/src/model/forecastWeatherType";
import { WeatherApiResponse } from "weatherapp-common/src/model/apiResponseType";

export function parseCurrentWeather({
  current_weather,
  daily,
}: WeatherApiResponse): CurrentWeather {
  const {
    temperature,
    windSpeed: windSpeed,
    weatherCode: weatherCode,
  } = current_weather as CurrentWeather;
  const maxTemp = daily?.apparent_temperature_max?.[0];
  const minTemp = daily?.temperature_2m_min?.[0];
  const maxFeelsLike = daily?.apparent_temperature_max?.[0];
  const minFeelsLike = daily?.apparent_temperature_min?.[0];
  const precip = daily?.precipitation_sum?.[0];
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

export function parseDailyWeather({ daily }: WeatherApiResponse) {
  return daily?.time?.map((time, index) => {
    return {
      time,
      weatherCode: daily?.weathercode?.[index],
      maxTemp: daily?.temperature_2m_max?.[index],
      minTemp: daily?.temperature_2m_min?.[index],
    };
  });
}

export function parseHourlyWeather({
  hourly,
  current_weather,
}: WeatherApiResponse) {
  // eslint-disable-next-line prettier/prettier
  return hourly?.time?.map((time, index) => {
      return {
        time,
        weatherCode: hourly?.weathercode?.[index],
        temperature: hourly?.temperature_2m?.[index],
        feelsLike: hourly?.apparent_temperature?.[index],
        windSpeed: hourly?.windspeed_10m?.[index],
        precip: hourly?.precipitation?.[index],
      };
    })
    .filter(({ time }) => moment(time) >= moment(current_weather?.time));
}
