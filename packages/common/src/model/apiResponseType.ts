export class WeatherApiResponse {
    current_weather?: CurrentResponse;
    daily?: DailyResponse;
    hourly?: HourlyResponse;
    hourly_units?: HourlyResponseUnit;
    daily_units?: DailyResponseUnit;
}


export class CurrentResponse {
    temperature!: number;
    time!: string;
    weathercode?: number;
    winddirection?: number;
    windspeed?: number;
}

export class DailyResponse {
    apparent_temperature_max?: number[];
    apparent_temperature_min?: number[];
    precipitation_sum?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    time?: string[];
    weathercode?: number[];
}

export class HourlyResponse {
    apparent_temperature?: number[];
    precipitation?: number[];
    temperature_2m?: number[];
    time?: string[];
    weathercode?: number[];
    windspeed_10m?: number[];
}

export class DailyResponseUnit {
    apparent_temperature_max!: string
    apparent_temperature_min!: string
    precipitation_sum!: string
    temperature_2m_max!: string
    temperature_2m_min!: string
    time!: string
    weathercode!: string
}

export class HourlyResponseUnit {

    apparent_temperature!: string;
    precipitation!: string;
    temperature_2m!: string;
    time!: string;
    weathercode!: string;
    windspeed_10m!: string;
}