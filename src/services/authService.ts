import type { LoginData, RegisterData, responseAuth } from "../types/auth";
import { api } from "./api";

export async function login(data: LoginData): Promise<responseAuth> {
    return api<responseAuth>('login', {
        method: "POST",
        data,
    });
}

export async function register(data: RegisterData): Promise<responseAuth> {
    return api<responseAuth>('register', {
        method: "POST",
        data,
    });
}
