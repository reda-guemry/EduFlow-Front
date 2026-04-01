import type { Course } from "./cours";



export type PaginatedResponse = {
    data: Course[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    }
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: PaginationLink[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    }
};


export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};