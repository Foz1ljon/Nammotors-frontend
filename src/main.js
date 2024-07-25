import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import "@flaticon/flaticon-uicons/css/all/all.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";
import axiosPlugin from "./plugins/axiosPlugin";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(axiosPlugin);
app.use(Toast);

app.mount("#app");
