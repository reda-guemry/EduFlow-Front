import type { Category } from "./cours";



export type UserProfile = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: 'student' | 'teacher';
    intersests?: Category[];
}