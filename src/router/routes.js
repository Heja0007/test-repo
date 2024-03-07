import DashboardLayout from "../layout/dashboard/DashboardLayout.vue";
import NotFound from "..//pages/NotFoundPage.vue";

import Materials from "../pages/Materials.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: Materials,
      },
    ],
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
