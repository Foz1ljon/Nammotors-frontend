import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Products from "../views/Products.vue";
import Admins from "../views/Admins.vue";
import Categories from "../views/Categories.vue";
import Clients from "../views/Clients.vue";
import Contracts from "../views/Contracts.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/login",
    name: "auth",
    component: () => import("@/pages/Auth.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "dashboard",
    redirect: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/profile",
        name: "my-profile",
        component: Profile,
        meta: { requiresAuth: true },
      },
      {
        path: "/dashboard",
        name: "home-page",
        component: Home,
        meta: { requiresAuth: true },
      },
      {
        path: "/products",
        name: "product-list",
        component: Products,
        meta: { requiresAuth: true },
      },
      {
        path: "/products/:id",
        name: "product-update",
        component: "",
        meta: { requiresAuth: true },
      },
      {
        path: "/product",
        name: "product-create",
        component: "",
        meta: { requiresAuth: true },
      },
      {
        path: "/product/:id",
        name: "product-id",
        component: "",
        meta: { requiresAuth: true },
      },
      {
        path: "/admins",
        name: "admins-list",
        component: Admins,
        meta: { requiresAuth: true },
      },
      {
        path: "/admins/:id",
        name: "admin-update",
        component: "",
        meta: { requiresAuth: true },
      },

      {
        path: "/admin/:id",
        name: "admin-id",
        component: "",
        meta: { requiresAuth: true },
      },
      {
        path: "/categories",
        name: "category-list",
        component: Categories,
        meta: { requiresAuth: true },
      },
      {
        path: "/categoris/:id",
        name: "category-update",
        component: "",
        meta: { requiresAuth: true },
      },
      {
        path: "/categori/:id",
        name: "category-id",
        component: "",
        meta: { requiresAuth: true },
      },

      {
        path: "/clients",
        name: "client-list",
        component: Clients,
        meta: { requiresAuth: true },
      },
      {
        path: "/clients/:id",
        name: "client-update",
        component: "",
        meta: { requiresAuth: true },
      },
      {
        path: "/client/:id",
        name: "client-id",
        component: "",
        meta: { requiresAuth: true },
      },
      {
        path: "/client",
        name: "client-create",
        component: "",
        meta: { requiresAuth: true },
      },

      {
        path: "/contracts/:id",
        name: "contract-update",
        component: "",
        meta: { requiresAuth: true },
      },
      {
        path: "/contract/:id",
        name: "contract-id",
        component: "",
        meta: { requiresAuth: true },
      },
      {
        path: "/contracts",
        name: "contract-list",
        component: Contracts,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Global navigation guard to check authentication based on meta field
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is authenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if authentication is required and user is not authenticated
    next({ name: "auth" });
  } else {
    // Proceed to the requested route
    next();
  }
});

export default router;
