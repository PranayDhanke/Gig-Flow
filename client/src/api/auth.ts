import type { authLogin, authRegister } from "@/types/auth";
import api from "./axios";

export async function RegisterUser(data: authRegister) {
  const res = await api.post("/auth/register", { data });
  return res;
}

export async function LoginUser(data: authLogin) {
  const res = await api.post("/auth/login", { data });
  return res;
}

export async function getMe() {
  const res = await api.get("/auth/getMe");
  return res;
}

export async function LogoutUser() {
  await api.post("/auth/logout");
}
