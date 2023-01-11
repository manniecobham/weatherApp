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

export const ICON_MAP = new Map();

iconMapping([0, 1], "weather-sunny");
iconMapping([2], "weather-sunset-up");
iconMapping([3], "cloud");
iconMapping([45, 48], "smog");
iconMapping(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  "weather-pouring"
);
iconMapping([71, 73, 75, 77, 85, 86], "snowflakes");
iconMapping([895, 96, 99], "weather-lightning-rainy");

function iconMapping(values: number[], icon: string) {
  values.forEach((value) => {
    ICON_MAP.set(value, icon);
  });
}
