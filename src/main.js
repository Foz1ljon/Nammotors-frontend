import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import "@flaticon/flaticon-uicons/css/all/all.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
