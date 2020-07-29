<template>
  <div>
    <PrescriptionList :PresInfos="PresInfos"></PrescriptionList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import newsService from "../services/newsService";
// import NewsList from "../components/NewsList.vue";
// import { ArticleType, NewsArticle } from "../types";
import Storage from "vue-web-storage";
import forceRerender from "../App.vue";
import {
  PreMassageType,
  UserInfoModel,
  PrescritInputModel,
  PresInfo
} from "../types";
import proscriptionService from "../services/prescriptionService";
import PrescriptionList from "../components/PrescriptionList.vue";
import io from "socket.io-client";
Vue.use(Storage);

console.log(forceRerender);

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
// console.log("token");
// console.log(result.Token);

// const socket = io("https://pharmgo.gosuite.kr", {
//   query: { token: result.token }
// });

// const socket = io("http://localhost:3000", {
//   query: { token: result.Token }
// });

@Component({
  components: {
    PrescriptionList
  }
})
export default class Prescription extends Vue {
  PresInfos: Array<any> = [];
  created() {
    if (Vue.$localStorage.get("usrInfo") == null) {
      alert("로그인을 해주세요.");
      window.location.href = "http://" + document.URL.split("/")[2] + "/";
      // console.log(document.URL.split("/"));
    } else {
      var result = JSON.parse(Vue.$localStorage.get("usrInfo"));
      // const socket = io("http://localhost:3000", {
      const socket = io("http://10.41.154.86", {
        query: { token: result.Token }
      });
      var usrInfo: UserInfoModel = JSON.parse(Vue.$localStorage.get("usrInfo"));
      var status: number[] = [20, 30];
      proscriptionService
        .getPrescriptByHosIDByData(usrInfo, status)
        .then((PresInfos: any) => {
          this.PresInfos = PresInfos;
          socket.on("30", function(msg) {
            PresInfos.push(msg.body);
            this.PresInfos = PresInfos;
            // window.location.reload();
            // // console.log(container.scrollHeight);
            // var element = document.getElementById("cont");
            // element.scrollIntoView(false);
            // var container = this.$refs.msgContainer;
            // container.scrollTop = container.scrollHeight + 120;
            // console.log(document.body.scrollHeight);
            // console.log(document.documentElement.scrollHeight);
            window.scrollTo(
              0,
              document.body.scrollHeight ||
                document.documentElement.scrollHeight
            );
          });
          socket.on("20", function(msg) {
            console.log("test");
            console.log(msg.body);
            PresInfos.push(msg.body);
            this.PresInfos = PresInfos;
            // window.location.reload();
            // // console.log(container.scrollHeight);
            // var element = document.getElementById("cont");
            // element.scrollIntoView(false);
            // var container = this.$refs.msgContainer;
            // container.scrollTop = container.scrollHeight + 120;
            // console.log(document.body.scrollHeight);
            // console.log(document.documentElement.scrollHeight);
            window.scrollTo(
              0,
              document.body.scrollHeight + 100 ||
                document.documentElement.scrollHeight + 100
            );
          });
        })
        .catch((e: any) => {
          console.error("Error : ", e);
        });
      console.log(this.PresInfos);
    }
  }
  // updated() {
  //   // var container = document.getElementById("cont");
  //   // container.scrollTop(container.scrollHeight);
  //   // console.log(document.body.scrollHeight);
  //   // console.log(document.body.scrollTop);
  //   // document.body.scrollTop = document.body.scrollHeight;
  //   el = document.getElementById("cont");
  //   if (el) {
  //     el.scrollIntoView();
  //   }
  // }
}
</script>
