<template>
  <v-container>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-text>
              <v-row no-gutters dense>
                <v-col no-gutters class="align-center" dense>
                  <div>
                    <v-icon x-large>mdi-cloud</v-icon>
                    <span>31&deg;C</span>
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
            </v-list-item-text>
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
            <v-row no-gutters class="pa-2">
              <!-- Remember to turn to table -->
              <v-col
                no-gutters
                dense
                v-for="(item, index) in futureValues"
                :key="index"
              >
                <span>
                  <v-row dense>{{ item.label }}</v-row>
                  <v-row dense>{{ item.value }}</v-row>
                </span>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
// import {} from "weatherapp-common/src/weathertype";

export default Vue.extend({
  name: "HelloWorld",

  data: () => ({
    date: new Date(),
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
  }),
  computed: {
    getDays() {
      return moment.weekdays();
    },
  },
});
</script>
