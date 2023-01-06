<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <div>App Name Here --</div>
    <v-divider></v-divider>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "AppbarComponent",
  data: () => ({
    drawer: false,
  }),
});
</script>
