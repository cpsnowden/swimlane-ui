import axios from "axios";

import { API_BASE_URL } from "src/constants";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
