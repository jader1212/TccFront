var axios = require("axios");

export const jwtToken = localStorage.getItem("token");

axios.interceptors.request.use(
  function(config) {
    if (jwtToken) {
      config.headers["Authorization"] = jwtToken ? `Bearer ${jwtToken}` : ''; //"Bearer " + jwtToken; 
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);