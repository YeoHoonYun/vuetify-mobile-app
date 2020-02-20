<template>
  <v-bottom-navigation
    app
    fixed
    grow
    v-model="activeItem"
    color="primary"
    v-if="view_check"
  >
    <v-btn value="top" :to="{ path: '/prescription' }">
      <span>List</span>
      <v-icon large color="blue darken-2">chat</v-icon>
    </v-btn>

    <v-btn value="code" :to="{ path: beforeDetail }">
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
  beforeDetail: string = "";
  view_check = false;
  created() {
    // if (["/prescription", "/"].includes(window.location.pathname)) {
    //   this.view_check = false;
    // } else {
    //   console.log(Vue.$localStorage.get("beforeDatailPath"));
    //   this.beforeDetail = Vue.$localStorage.get("beforeDatailPath");
    //   this.view_check = true;
    // }
  }
}
</script>
