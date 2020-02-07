<template>
  <div>
    <v-navigation-drawer app fixed v-model="showMenu">
      <v-list dense>
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app fixed dark color="primary">
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn color="blue-grey" class="ma-2 white--text" @click="logout">
        logout
      </v-btn>
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
  @Getter("title", { namespace: "topToolbar" }) title!: string;

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

  doNothing(): void {}
}
</script>
