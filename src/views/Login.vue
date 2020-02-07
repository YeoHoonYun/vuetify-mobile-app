<template>
  <div>
    <LoginForm :userInfo="userInfo"></LoginForm>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import loginService from "../services/loginService";
import LoginForm from "../components/LoginForm.vue";
import { UserInfoModel } from "../types";

// console.log(Vue.$localStorage.get("app_usrInfo") === null);
// if (Vue.$localStorage.get("app_usrInfo") == null) {
//   window.location.href = "localhost/login";
// }

@Component({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {
  userInfo = {};

  mounted() {
    // loginService.getUserInfoModel().then((userInfo: UserInfoModel) => {
    //   this.userInfo = userInfo;
    // });
  }
}
</script>
