export type UserRole = 'student' | 'teacher';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: UserRole;
}

export type LoginData = {
    email: string;
    password: string;
}


export type RegisterData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: UserRole;
}

export type AuthData = {
    token: string;
    refresh_token: string;
    user: User;
}

export type responseAuth = {
    message: string;
    data: AuthData;
}


