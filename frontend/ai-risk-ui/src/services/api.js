import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const fetchAccounts = async () => {
  const res = await API.get("/accounts");
  return res.data.accounts;
};

export default API;