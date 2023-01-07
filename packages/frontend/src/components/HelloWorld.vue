<template>
  <v-container>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-text>
              <v-row no-gutters>
                <v-col no-gutters>
                  <v-icon x-large>mdi-cloud</v-icon>
                  <span>31&deg;C</span>
                </v-col>
                <v-col no-gutters>
                  <v-icon x-large>mdi-cloud</v-icon>
                  <span>31&deg;C</span>
                </v-col>
              </v-row>
            </v-list-item-text>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
// import {} from "weatherapp-common/src/weathertype";

export default Vue.extend({
  name: "HelloWorld",

  data: () => ({
    date: new Date(),
  }),
});
</script>
