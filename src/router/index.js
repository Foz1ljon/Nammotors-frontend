import { createRouter, createWebHistory } from "vue-router";
import UpdateModal from "../components/UpdateModal.vue";

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
    component: () => import("@/pages/Dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/profile",
        name: "my-profile",
        component: () => import("@/views/Profile.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/dashboard",
        name: "home-page",
        component: () => import("@/views/Home.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/products",
        name: "product-list",
        component: () => import("@/views/Products.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/products/:id",
        name: "product-update",
        component: UpdateModal,
        meta: { requiresAuth: true },
      },

    
      {
        path: "/admins",
        name: "admins-list",
        component: () => import("@/views/Admins.vue"),
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
        component: () => import("@/views/Categories.vue"),
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
        component: () => import("@/views/Clients.vue"),
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
        component: () => import("@/views/Contracts.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
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
