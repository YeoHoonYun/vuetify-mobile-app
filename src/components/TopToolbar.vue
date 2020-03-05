<template>
  <div>
    <v-navigation-drawer app fixed v-model="showMenu" class="sm-2">
      <v-list dense>
        <v-list-item :to="{ path: '/prescription' }">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/about' }">
          <v-list-item-action>
            <v-icon>help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-cloud-upload</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed dark color="primary" height="85%">
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>

      <v-toolbar-title style="font-size:22px">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-btn
          class="ma-2"
          color="blue-grey"
          dark
          :to="{ path: '/prescription' }"
          v-if="view_check"
        >
          <v-icon blue left>mdi-arrow-left</v-icon>Home
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import Storage from "vue-web-storage";
// Vue.use(Storage);

@Component
export default class TopToolbar extends Vue {
  items: String[] = ["Foo", "Bar", "Fizz", "Buzz"];

  @Getter("title", { namespace: "topToolbar" }) title!: string;
  view_check = true;
  created() {
    if (["/"].includes(window.location.pathname)) {
      this.view_check = false;
    } else {
      this.beforeDetail = Vue.$localStorage.get("beforeDatailPath");
      this.view_check = true;
    }
  }
  showMenu: boolean = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    if (Vue.$localStorage.get("usrInfo") == null) {
      alert("이미 로그아웃 되었습니다.");
      window.location.href = "http://" + document.URL.split("/")[2] + "/";
    } else {
      alert("로그아웃 되었습니다.");
      Vue.$localStorage.clear("usrInfo");
      window.location.href = "http://" + document.URL.split("/")[2] + "/";
    }
  }

  home(): void {
    window.location.href =
      "http://" + document.URL.split("/")[2] + "/prescription";
  }

  data: () => {};

  doNothing(): void {}
}
</script>
