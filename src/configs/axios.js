import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-zingmp3-project.onrender.com/api",
  withCredentials: true
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error?.response?.status || 500;
    console.log(status);
    switch (status) {
      // authentication (token related issues)
      case 401: {
        // const sessionData = {
        //   isAuthenticated: false,
        //   token: "",
        //   data: null
        // }
        // localStorage.setItem("account", JSON.stringify(sessionData));
        // window.location.href = "/login";
        return Promise.reject(error);
      }
      // forbidden (permission related issues)
      case 403: {
        return Promise.reject(error);
      }
      // bad request
      case 400: {
        return Promise.reject(error);
      }
      // not found
      case 404: {
        return Promise.reject(error);
      }
      // conflict
      case 409: {
        return Promise.reject(error);
      }
      // unprocessable
      case 422: {
        return Promise.reject(error);
      }
      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
