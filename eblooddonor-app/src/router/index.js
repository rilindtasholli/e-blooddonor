import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import User from "@/views/User";

import store from "../store";

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
      {
        path: "appointment",
        component: () =>
          import(
            /* webpackChunkName: "announcement" */ "../views/HomePages/NewAppointment.vue"
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
    path: "/contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/ContactUs.vue"),
  },
  {
    path: "/user/",
    component: User,
    redirect: "/user/profile",
    children: [
      {
        path: "profile",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "user" */ "../views/UserPages/Profile.vue"
          ),
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/UserPages/Register.vue"),
      },
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/UserPages/Login.vue"),
      },
      {
        path: "appointments",
        meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/UserPages/UserAppointments.vue"),
      },
      {
        path: "history",
        meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/UserPages/DonationHistory.vue"),
      },
    ],
  },

   //---------------- Admin Panel ----------------
   { 
    path: '/admin/dashboard',
    meta: { requiresAuth: true },
    // component: () => import(/* webpackChunkName: "dashboard" */ "../views/Admin/Dashboard.vue"),
  },
  { 
    path: '/admin/users',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "users" */ "../views/Admin/Users.vue"),
  },
  { 
    path: '/admin/announcements',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "announcements" */ "../views/Admin/Announcements.vue"),
  },
  { 
    path: '/admin/appointments',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "appointments" */ "../views/Admin/Appointments.vue"),
  },
  { 
    path: '/admin/messages',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "messages" */ "../views/Admin/Messages.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {

  //if token is invalid or expired -> Logout
  if(checkIfAuthenticated() && !checkToken()){
    store.dispatch('Logout')
    next("/user/login");
    location.reload();
  }

  //if user is authenticated and tries to navigate to Login/Register
  if(checkIfAuthenticated() && (to.path == '/user/login' || to.path == '/user/register')){
    next("/user/profile");
  }

  //check authentication for every page that requires to be authenticated
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    
    if(checkIfAuthenticated()){
      next();
      return;
    }
  
    console.log('router: notAuthenticated')
    next("/user/login");

  }

  next();
});

function checkIfAuthenticated(){
  return store.getters.isAuthenticated
}

function checkToken(){
  
  if(localStorage.getItem('jwt') == store.getters.jwt.token){
    var currentTime = new Date();
    var tokenDate = new Date(store.getters.jwt.expiration)

    if(currentTime > tokenDate){
      console.error('checkToken: token expired')
      return false
    }

    console.log('checkToken: token is not expired yet!')
    return true

  }else{
    console.error('checkToken: invalid token')
    return false
  }

}



export default router;
