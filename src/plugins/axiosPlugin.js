import axios from "axios";
import VueAxios from "vue-axios";

const apiUrl = process.env.VUE_APP_API_URL;
console.log(apiUrl);
export default {
  install(Vue) {
    axios.defaults.baseURL = apiUrl;
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.interceptors.request.use(
      (config) => {
        config.headers['Access-Control-Allow-Origin'] = '*'; // Replace with appropriate CORS headers
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    Vue.use(VueAxios, axios);
  }
};