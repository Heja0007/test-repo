import Notify from "vue-notifyjs";
import SideBar from "@/components/SidebarPlugin";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import axiosPlugin from "./axiosPlugin";
import Vuetify from "./vuetify";
import "es6-promise/auto";
import helper from "../helper";


//css assets
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/sass/paper-dashboard.scss";
import "@/assets/css/themify-icons.css";
import "toastr/build/toastr.css"
window.helper = helper;

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
    Vue.use(SideBar);
    Vue.use(Notify);
    Vue.use(axiosPlugin);
    Vue.use(Vuetify);
  },
};
