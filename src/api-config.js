let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
} else {
  backendHost = "http://15.164.218.157:8080";
}

export const API_BASE_URL = `${backendHost}`;
