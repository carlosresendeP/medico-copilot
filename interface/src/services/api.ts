// src/services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://medico-copilot.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
