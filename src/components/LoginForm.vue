<template>
  <div>
    <v-container fluid fill-height style="width:100%;height:100%">
      <v-layout flex align-center justify-center row class="text-xs-center">
        <v-flex xs4 class="grey lighten-4">
          <v-container
            style="position: relative;top: 13%;"
            class="text-xs-center"
          >
            <v-card flat>
              <v-card-title primary-title>
                <h4>Login</h4>
              </v-card-title>
              <v-form>
                <v-text-field
                  prepend-icon="person"
                  name="Username"
                  label="Username"
                  value="pan1234"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="Password"
                  label="Password"
                  type="password"
                  value="qwe123!@#"
                ></v-text-field>
                <v-card-actions>
                  <v-btn primary large block @click="chkLogin">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div></template
>

<script type="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginService from "../services/loginService";
import { LoginType, UserInfoModel } from "../types";
import Storage from "vue-web-storage";
Vue.use(Storage)
// Vue.use(Storage, {
//   prefix: "your_app_slug_", // default `app_`
//   drivers: ["session", "local"] // default 'local'
// });

@Component
export default class LoginForm extends Vue {
  userInfo = {};
  chkLogin() {
    const PharmID = "A0000000";
    const Username = document.querySelector("input[name=Username]").value;
    const Password = document.querySelector("input[name=Password]").value;

    var login = {
      PharmID: PharmID,
      UserID: Username,
      UserPW: Password
    };
    var result = LoginService.getUserInfoModel(login)
    result.then(function(loginInfo) {
      if (loginInfo == undefined){
        alert("로그인에 실패하였습니다.")
      }else{
        Vue.$localStorage.set('usrInfo', JSON.stringify(loginInfo))
        alert("로그인 되었습니다.")
        window.location.href = document.URL.split("/")[0] + "/prescription";
      }
    }).catch(function(error){
      alert("로그인 실패하였습니다.")
    });

  }
}
</script>
