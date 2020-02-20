<template
  ><div><PresInfoView :PresInfos="PresInfos"></PresInfoView></div
></template>

<script src="https://unpkg.com/vue-router"></script>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Storage from "vue-web-storage";
import proscriptionService from "../services/prescriptionService";
import PresInfoView from "../components/PresInfoView.vue";
import {
  PreMassageType,
  UserInfoModel,
  PrescritInputModel,
  PresInfo
} from "../types";
import io from "socket.io-client";
Vue.use(Storage);

// var result = {
//   token:
//     "eyJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiJwYW4xMjM0IiwiVXNlclBXIjoicXdlMTIzIUAjIiwiUGhhcm1JRCI6IkEwMDAwMDAwIiwiYXV0aCI6IlJPTEVfVVNFUiJ9.axkV3c-JaXG_6pxSjcRYXU4E7tkOw-b3Rc3S0qNN4iU",
//   EIO: "3",
//   transport: "polling",
//   t: "637147054987893525-0",
//   b64: "1"
// };

// var result = JSON.parse(Vue.$localStorage.get("usrInfo"));
// console.log(result);
// var result = JSON.parse(Vue.$localStorage.get("usrInfo"));

// const socket = io("https://pharmgo.gosuite.kr", {
//   query: { token: result.token }
// });

// const socket = io("http://localhost:3000", {
//   query: { token: result.token }
// });

@Component({
  components: {
    PresInfoView
  }
})
export default class PrescripDetail extends Vue {
  PresInfos: PresInfo[] = [];

  created() {
    if (Vue.$localStorage.get("usrInfo") == null) {
      alert("로그인을 해주세요.");
      window.location.href = "http://" + document.URL.split("/")[2] + "/";
    } else {
      var result = JSON.parse(Vue.$localStorage.get("usrInfo"));
      const socket = io("http://localhost:3000", {
        query: { token: result.token }
      });

      // Vue.$localStorage.set("beforeDatailPath", this.$route.path);
      var usrInfo: UserInfoModel = JSON.parse(Vue.$localStorage.get("usrInfo"));
      var status: number = this.$route.params.status;
      console.log(this.$route);
      proscriptionService
        .getPrescriptByHosIDByIssueNo(
          usrInfo,
          this.$route.params.hosid,
          this.$route.params.issno
        )
        .then((PresInfos: PresInfo) => {
          console.log(PresInfos);
          this.PresInfos = PresInfos;
          // socket.on("30", function(msg) {
          //   PresInfos.push(msg.body);
          //   this.PresInfos = PresInfos;
          //   // // console.log(container.scrollHeight);
          //   // var element = document.getElementById("cont");
          //   // element.scrollIntoView(false);
          //   // var container = this.$refs.msgContainer;
          //   // container.scrollTop = container.scrollHeight + 120;
          //   // console.log(document.body.scrollHeight);
          //   // console.log(document.documentElement.scrollHeight);
          //   window.scrollTo(
          //     0,
          //     document.body.scrollHeight + 100 ||
          //       document.documentElement.scrollHeight + 100
          //   );
          // });
        });
    }
  }
}
</script>
