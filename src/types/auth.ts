export type UserRole = 'student' | 'teacher';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: UserRole;
}

export type AuthContextType = {
    accessToken: string | null;
    user : User | null ; 
    authLoading: boolean;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
    navigate: (path: string) => void;
}

export type AuthRefresh = {
    message: string;
    token: string;
    user: User;
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
    user: User;
}

export type responseAuth = {
    message: string;
    data: AuthData;
}


