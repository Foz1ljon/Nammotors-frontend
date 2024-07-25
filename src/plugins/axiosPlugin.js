// src/plugins/axiosPlugin.js
import axiosInstance from "@/api/index"; // Ensure the correct import path

export default {
  install(app) {
    app.config.globalProperties.api = axiosInstance; // Use 'api' as the global property
  },
};
