<template>
  <v-navigation-drawer v-model="value" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Application </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item>
        <v-list-item-icon>
          <!-- <v-icon>{{ item.icon }}</v-icon> -->
        </v-list-item-icon>

        <v-list-item-content>
          <!-- <v-list-item-title>{{ item.name }}</v-list-item-title> -->
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- <div>{{ routes }}</div> -->
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    drawer: null,
  }),
  props: {
    value: { type: Boolean },
  },
  computed: {
    routes() {
      return this.$router;
    },
  },
});
</script>
