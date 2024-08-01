import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "auth",
    component: () => import("@/layout/Auth.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "dashboard",
    redirect: "/dashboard",
    component: () => import("@/layout/Dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/profile",
        name: "my-profile",
        component: () => import("@/pages/Profile.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/cart",
        name: "cart-page",
        component: () => import("@/pages/Cart.vue"),
        meta: { requiresAuth: true },
      },

      {
        path: "/dashboard",
        name: "home-page",
        component: () => import("@/pages/Home.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/product",
        name: "product-create",
        component: () => import("@/pages/CreateAdmin.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/products",
        name: "product-list",
        component: () => import("@/pages/Products.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/products/:id",
        name: "product-update",
        component: () => import("@/pages/UpdateProduct.vue"),
        meta: { requiresAuth: true },
      },

      {
        path: "/admins",
        name: "admins-list",
        component: () => import("@/pages/Admins.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/admins/:id",
        name: "admin-update",
        component: "",
        meta: { requiresAuth: true },
      },

      {
        path: "/categories",
        name: "category-list",
        component: () => import("@/pages/Categories.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/categoris/:id",
        name: "category-update",
        component: "",
        meta: { requiresAuth: true },
      },

      {
        path: "/clients",
        name: "client-list",
        component: () => import("@/pages/Clients.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/clients/:id",
        name: "client-update",
        component: () => import("@/pages/UpdateClient.vue"),
        meta: { requiresAuth: true },
      },

      {
        path: "/client",
        name: "client-create",
        component: () => import("@/pages/CreateClient.vue"),
        meta: { requiresAuth: true },
      },

      {
        path: "/contracts/:id",
        name: "contract-update",
        component: "",
        meta: { requiresAuth: true },
      },

      {
        path: "/contracts",
        name: "contract-list",
        component: () => import("@/pages/Contracts.vue"),
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
