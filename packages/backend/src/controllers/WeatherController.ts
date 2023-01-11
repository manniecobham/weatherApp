import axios from "axios";
import { Get, JsonController, Param, Params, QueryParam, QueryParams } from "routing-controllers";
import { User } from "weatherapp-common/src/model/userDataType";
import { WeatherApiResponse } from "weatherapp-common/src/model/apiResponseType"
import { CurrentWeather } from "weatherapp-common/src/model/currentWeatherType"
import { MyWeatherList } from "weatherapp-common/src/model/myResponseType"
import { IsDecimal } from "class-validator";
import { IsAlpha } from "class-validator/types/decorator/decorators";

const weatherURL =
    "https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true";

export type UserInformation = {
    // @IsDecimal()
    latitude: number;

    // @IsDecimal()
    longitude: number;

    // @IsAlpha()
    timezone: string;
}

@JsonController("/home")

export class WeatherController {

    private getWeatherDetailList(longitude: number): Promise<MyWeatherList> {

        // const currentUser = this.currentUser()
        return axios.get(weatherURL, {
            params: {
                // latitude: currentUser.latitude,
                longitude: longitude,
                // timezone: currentUser.timezone,
            },
        }).then((response) => {
            return {
                current: this.parseCurrentWeather(response.data)
            }
        })
    }
    // private currentUser() {
    //     return {
    //     longitude: 7.4653,
    //     latitude: 51.5136,
    //     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    //   }}

    private parseCurrentWeather({ current_weather, daily, }: WeatherApiResponse): CurrentWeather {
        const {
            temperature,
            windspeed: windSpeed,
            weathercode: weatherCode,
        } = current_weather;

        const maxTemp = daily?.apparent_temperature_max?.[0]
        const minTemp = daily?.temperature_2m_min?.[0]
        const maxFeelsLike = daily?.apparent_temperature_max?.[0]
        const minFeelsLike = daily?.apparent_temperature_min?.[0]
        const precip = daily?.precipitation_sum?.[0]
        // const maxTemp = daily.apparent_temperature_max?.[0]

        // const {
        //   temperature_2m_max: [maxTemp],
        //   temperature_2m_min: [minTemp],
        //   apparent_temperature_max: [maxFeelsLike],
        //   apparent_temperature_min: [minFeelsLike],
        //   precipitation_sum: [precip],
        // } = daily;
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
    getCurrent(@QueryParam("longitude") longitude: number): Promise<MyWeatherList> {
        return this.getWeatherDetailList(longitude)
    }
    @Get("/well")
    getTrial() {
        return "I am working"
    }

}