export class MyCurrentWeather {
    highFeelsLike?: number;
    highTemp?: number;
    lowFeelsLike?: number;
    lowTemp?: number;
    precip?: number;
    temperature?: number;
    weatherCode?: number;
    windSpeed?: number;
}

export class MyDailyWeather {
    time?: string; weatherCode?: number; maxTemp?: number; minTemp?: number
}
export class MyHourlyWeather {
    feelsLike?: number;
    precip?: number;
    temperature?: number;
    time?: string;
    weatherCode?: number;
    windSpeed?: number;
}

export class MyWeatherList {
    current?: MyCurrentWeather;
    hourly?: MyHourlyWeather[];
    daily?: MyDailyWeather[];
}