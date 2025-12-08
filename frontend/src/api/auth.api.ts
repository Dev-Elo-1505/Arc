import { api } from "./axios";
import { type LoginSchema, type SignupSchema } from "../schemas/authSchemas";

export const signup = async (payload: SignupSchema) => {
    const body = {
        email: payload.email,
        password: payload.password,
        first_name: payload.firstName,
        last_name: payload.lastName
    }
    const res = await api.post("/api/auth/register", body);
    return res.data;
}

export const login = async (payload: LoginSchema) => {
    const res = await api.post("/api/auth/login", payload);
    return res.data;
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}