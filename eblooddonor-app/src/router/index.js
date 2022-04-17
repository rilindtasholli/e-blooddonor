import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import User from "@/views/User";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "../views/HomePages/HomePage.vue"
          ),
      },
      {
        path: "announcement",
        component: () =>
          import(
            /* webpackChunkName: "announcement" */ "../views/HomePages/AnnouncementShow.vue"
          ),
      },
    ],
  },
  {
    path: "/about",
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/user/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },

  {
    path: "/user/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Login.vue"),
  },

  {
    path: "/user/",
    component: User,
    redirect: "/user/profile",
    children: [
      {
        path: "profile",
        // component: () => import(/* webpackChunkName: "user" */ "../views/Profile.vue"),
      },
      {
        path: "login",
        // component: () => import(/* webpackChunkName: "user" */ "../views/Login.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
