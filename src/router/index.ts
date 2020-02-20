import Vue from "vue";
import Router from "vue-router";
import store from "../store";

import Prescription from "../views/Prescription.vue";
import PrescripDetail from "../views/PrescripDetail.vue";
import AboutView from "../views/AboutView.vue";

import Login from "../views/Login.vue";
Vue.use(Router);

class RouteMeta {
  title: string;
  constructor({ title }: { title: string }) {
    this.title = title;
  }
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: new RouteMeta({ title: "로그인" })
    },
    {
      path: "/prescription",
      name: "prescription",
      component: Prescription,
      meta: new RouteMeta({ title: "처방 리스트" })
    },
    {
      path: "/prescripdetail/:hosid/:issno/:status",
      name: "prescripdetail",
      component: PrescripDetail,
      meta: new RouteMeta({ title: "처방전 상세" })
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: new RouteMeta({ title: "회사소개" })
    }
  ]
});

// This callback runs before every route change, including on initial load
router.beforeEach((to, from, next) => {
  // var sesCtk = false;
  // next({
  //   path: "/login",
  //   query: {
  //     redirect: to.fullPath
  //   }
  // });
  // sesCtk = true;
  // console.log(Vue.$localStorage.get("app_usrInfo") != null && sesCtk);
  // if (Vue.$localStorage.get("app_usrInfo") == null && sesCtk) {

  // }
  const routeMeta = to.meta as RouteMeta;
  store.dispatch("topToolbar/changeTitle", routeMeta.title);
  next();
});

export default router;
