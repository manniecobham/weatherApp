<template>
  <v-app>
    <appbar-component @click="drawer = !drawer" />
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
    </v-navigation-drawer>
    <main-component />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBarComponentVue from "./components/AppBarComponent.vue";
import MainComponent from "./components/MainComponent.vue";
// import NavbarComponent from "./components/NavbarComponent.vue";

export default Vue.extend({
  name: "App",
  components: {
    MainComponent: MainComponent,
    // NavbarComponent: NavbarComponent,
    appbarComponent: AppBarComponentVue,
  },
  data: () => ({
    drawer: false,
  }),
});
</script>
