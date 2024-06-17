import axios from "axios";

export default (method, url, data) => {
  const headers = {};
  if (localStorage.getItem("token")) {
    headers.auth = localStorage.getItem("token");
  }

  const apiUrl = import.meta.env.VITE_API_URL;

  return axios(apiUrl + url, {
    method: method,
    headers,
    data: data || "",
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
