let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
} else {
  backendHost = "https://api.ggamanggarden.shop";
}

export const API_BASE_URL = `${backendHost}`;
