<template>
  <v-container>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <!-- <v-list-item-text> -->
            <v-row no-gutters dense>
              <v-col no-gutters class="align-center" dense>
                <div>
                  <!-- <v-icon x-large
                    >mdi-{{ ICON_MAP.get(currentTemp.weatherCode) }}</v-icon
                  > -->
                  <span>{{ currentTemp.temperature }}&deg;C</span>
                </div>
                <v-divider vertical />
              </v-col>
              <v-col no-gutters>
                <v-row dense>
                  <template v-for="(item, index) in todayValues">
                    <v-col :key="index" cols="6" md="2" no-gutters>
                      <v-col no-gutters>
                        <span>{{ item.label }}</span>
                        <v-row no-gutters>
                          <span>{{ item.value }}{{ item.unit }}</span>
                        </v-row>
                      </v-col>
                    </v-col>
                  </template>
                </v-row>
              </v-col>
            </v-row>
            <!-- </v-list-item-text> -->
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-row dense>
              <v-col v-for="(item, index) in getDays" :key="index">
                <v-sheet outlined rounded class="align-center">
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>
                        {{ item }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-icon x-large>mdi-cloud</v-icon>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <span>30°C</span>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-sheet>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <!-- <v-row no-gutters class="pa-2"> -->
            <!-- Remember to turn to table -->
            <v-data-table
              :items="items"
              :headers="headers"
              hide-default-header
              hide-default-footer
            >
            </v-data-table>
            <!-- </v-row> -->
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-card>
    <div>{{ myData }}</div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import WeatherService from "../service/WeatherService";
// import { MyHourlyWeather } from "weatherapp-common/src/model/myResponseType";
import {
  MyCurrentWeather,
  MyHourlyWeather,
  MyWeatherList,
} from "weatherapp-common/src/model/myResponseType";
import { ICON_MAP } from "../helper/weatherhelpers";
import {
  parseCurrentWeather,
  parseDailyWeather,
  parseHourlyWeather,
} from "../helper/weatherhelpers";

export default Vue.extend({
  name: "HelloWorld",

  data: () => ({
    myData: "",
    currentTemp: {} as MyCurrentWeather,
    todayValues: [
      { label: "High", value: "20", unit: "°C" },
      { label: "FL High", value: "20", unit: "°C" },
      { label: "Wind", value: "9", unit: "°C" },
      { label: "Low", value: "19", unit: "°C" },
      { label: "FL Low", value: "19", unit: "°C" },
      { label: "Precip", value: "20", unit: "°C" },
    ],
    futureValues: [
      { label: "Monday", value: "3PM", unit: "" },
      { label: "Temp", value: "31", unit: "°C" },
      { label: "FL Temp", value: "31", unit: "°C" },
      { label: "Wind", value: "26", unit: "mph" },
      { label: "Precip", value: "31", unit: "in" },
    ],
    currentUser: {
      longitude: 7.4653,
      latitude: 51.5136,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    items: [] as MyHourlyWeather[] | undefined,
  }),
  computed: {
    getDays() {
      return moment.weekdays();
    },
    headers() {
      return [
        { text: "feelsLike", value: "feelsLike" },
        { text: "", value: "precip" },
        { text: "", value: "temperature" },
        {
          text: "",
          value: "time",
          format: (x: string) => moment(x).format("HH:mm"),
        },
        { text: "", value: "weatherCode" },
        { text: "", value: "precip" },
        { text: "", value: "windSpeed" },
      ];
    },
  },
  mounted() {
    // WeatherService.getCurrentWeatherDetail(this.currentUser).then((res) =>
    //   console.log(res)
    // );
    WeatherService.getCurrentWeatherDetail(this.currentUser).then(
      (res: MyWeatherList) => {
        this.currentTemp = res.current ?? {};
        this.items = res.hourly;
      }
    );
  },
  methods: {
    getIcon(code?: number): string {
      return ICON_MAP.get(Number(code));
    },
  },
});
</script>
