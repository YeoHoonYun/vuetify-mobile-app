<template>
  <v-bottom-navigation app fixed grow v-model="activeItem" color="primary">
    <v-btn value="top" :to="{ path: '/top-stories' }">
      <span>List</span>
      <v-icon large color="blue darken-2">chat</v-icon>
    </v-btn>

    <v-btn value="code" :to="{ name: 'code-examples' }">
      <span>Detail</span>
      <v-icon large color="teal darken-2">email</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BottomNav extends Vue {
  activeItem: string = "top";
}
</script>
