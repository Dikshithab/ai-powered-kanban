import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000/api",
});


// ======================================================
// REQUEST INTERCEPTOR
// ======================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Don't attach JWT to login/register/refresh
    if (
      token &&
      !config.url?.includes("/login/") &&
      !config.url?.includes("/register/") &&
      !config.url?.includes("/token/refresh/")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 errors
    if (
      error.response?.status !== 401 ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    // Don't try to refresh login/register requests
    if (
      originalRequest?.url?.includes("/login/") ||
      originalRequest?.url?.includes("/register/") ||
      originalRequest?.url?.includes("/token/refresh/")
    ) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refreshToken");

    // No refresh token available
    if (!refreshToken) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL ||
          "http://127.0.0.1:8000/api"
        }/token/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken = response.data.access;

      // Save new access token
      localStorage.setItem("token", newAccessToken);

      // Attach new token to original request
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      // Retry original request
      return api(originalRequest);

    } catch (refreshError) {
      console.error("Refresh token failed:", refreshError);

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      window.location.href = "/login";

      return Promise.reject(refreshError);
    }
  }
);


export default api;