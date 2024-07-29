import axios from "axios";

const instance = axios.create({
  baseURL: "http://194.226.49.125:4000/api",
});

export default instance;
