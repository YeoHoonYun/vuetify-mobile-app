import Vue from "vue";
import Router from "vue-router";
import store from "../store";

import TopStories from "../views/TopStories.vue";
import CodeExamples from "../views/CodeExamples.vue";
import MyFavorites from "../views/MyFavorites.vue";
import Login from "../views/Login.vue";
// import Storage from "vue-web-storage";
Vue.use(Router);

// console.log(Vue.$localStorage.get("app_usrInfo") === null);
// if (Vue.$localStorage.get("app_usrInfo") == null) {
//   window.location = url;
// }

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
    // {
    //   path: "/",
    //   name: "top-stories",
    //   component: MyFavorites,
    //   meta: new RouteMeta({ title: "수납 리스트 테스트" })
    // },
    {
      path: "/top-stories",
      name: "top-stories",
      component: TopStories,
      meta: new RouteMeta({ title: "수납 리스트" })
    },
    {
      path: "/code-examples",
      name: "code-examples",
      component: CodeExamples,
      meta: new RouteMeta({ title: "처방전 내역" })
    },
    {
      path: "/",
      name: "login",
      component: Login,
      meta: new RouteMeta({ title: "로그인" })
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
