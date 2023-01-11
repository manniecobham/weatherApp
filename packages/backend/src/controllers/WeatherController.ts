import axios from "axios";
import { Get, JsonController } from "routing-controllers";
import { User } from "weatherapp-common/src/model/userdataType";
import { MyWeatherApiResponse, WeatherApiResponse } from "weatherapp-common/src/model/apiResponseType"
import { CurrentWeather } from "weatherapp-common/src/model/currentWeatherType"

const weatherURL =
    "https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true";


@JsonController("/home")
export class WeatherController {
    private getWeatherDetailList(currentUser: User): Promise<MyWeatherApiResponse> {
        return axios.get(weatherURL, {
            params: {
                latitude: currentUser.latitude,
                longitude: currentUser.longitude,
                timezone: currentUser.timezone,
            },
        }).then((response) => {
            return {
                current: this.parseCurrentWeather(response.data)
            }
        } )
    }

    private parseCurrentWeather({current_weather, daily,}: WeatherApiResponse): CurrentWeather {
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
    @Get()
    getHome() {
        return "Hello";
    }
}