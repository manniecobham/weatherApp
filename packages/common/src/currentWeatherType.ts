// type CurrentWeatherList = CurrentWeather[]

export class CurrentWeather {
    time?: string;
    weatherCode!: number;
    windDirection?: number;
    windSpeed!: number;
    temperature!: number;
    highTemp?: number;
    lowTemp?: number;
    highFeelsLike?: number;
    lowFeelsLike?: number;
    precip?: number;
}