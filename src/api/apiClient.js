import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://recruiting.api.bemmbo.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
