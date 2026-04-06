import axios from "axios";

const API = axios.create({
  baseURL: "https://ato-22wq.onrender.com"
});

export const fetchAccounts = async () => {
  const res = await API.get("/accounts");
  return res.data.accounts;
};

export default API;