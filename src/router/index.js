import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Products from "../views/Products.vue";
import Admins from "../views/Admins.vue";
import Categories from "../views/Categories.vue";
import Clients from "../views/Clients.vue";
import Contracts from "../views/Contracts.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "auth",
      component: () => import("@/pages/Auth.vue"),
    },
    {
      path: "/",
      name: "dashboard",
      redirect: "/products",
      component: Dashboard,
      children: [
        {
          path: "/products",
          name: "product-list",
          component: Products,
        },
        {
          path: "/products/:id",
          name: "product-update",
          component: "",
        },
        {
          path: "/product",
          name: "product-create",
          component: "",
        },
        {
          path: "/product/:id",
          name: "product-id",
          component: "",
        },
        {
          path: "/admins",
          name: "admins-list",
          component: Admins,
        },
        {
          path: "/admins/:id",
          name: "admin-update",
          component: "",
        },
        {
          path: "/admin",
          name: "admin-create",
          component: "",
        },
        {
          path: "/admin/:id",
          name: "admin-id",
          component: "",
        },
        {
          path: "/categories",
          name: "category-list",
          component: Categories,
        },
        {
          path: "/categoris/:id",
          name: "category-update",
          component: "",
        },
        {
          path: "/categori/:id",
          name: "category-id",
          component: "",
        },
        {
          path: "/category",
          name: "category-create",
          component: "",
        },
        {
          path: "/clients",
          name: "client-list",
          component: Clients,
        },
        {
          path: "/clients/:id",
          name: "client-update",
          component: "",
        },
        {
          path: "/client/:id",
          name: "category-id",
          component: "",
        },
        {
          path: "/client",
          name: "client-create",
          component: "",
        },
        {
          path: "/contract",
          name: "contract-create",
          component: "",
        },
        {
          path: "/contracts/:id",
          name: "contract-update",
          component: "",
        },
        {
          path: "/contract/:id",
          name: "contract-id",
          component: "",
        },
        {
          path: "/contracts",
          name: "contract-list",
          component: Contracts,
        },
      ],
    },
  ],
});

export default router;
