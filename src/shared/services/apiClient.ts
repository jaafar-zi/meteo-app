import axios from "axios";

const API_BASE_URL = "https://api.meteo-concept.com/api";
const API_TOKEN = process.env.REACT_APP_METEO_API_TOKEN || "";

if (!API_TOKEN) {
  console.warn(
    "REACT_APP_METEO_API_TOKEN is not set. Add it to your .env file."
  );
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    token: API_TOKEN,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Invalid API token");
          break;
        case 429:
          console.error("Rate limit exceeded");
          break;
        case 404:
          console.error("Resource not found");
          break;
        default:
          console.error(`API Error: ${error.response.status}`);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;