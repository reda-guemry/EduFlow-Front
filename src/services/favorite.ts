
import type { PaginatedResponse } from "../types/favorite";
import { apiCall } from "./api";


export async function fetchFavorite(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: any) => void,
    path?: string
) {

    path = path ? path.split('?')[0] : undefined;

    return apiCall<PaginatedResponse> ('favorites' + (path ? `?${path.split('?')[1]}` : ''), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    },
        setAccessToken,
        setUser,
        onUnauthorized,
    );
};


export async function addFavorite(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: any) => void,
    courseId: number
) {
    return apiCall(`favorites/${courseId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    },
        setAccessToken,
        setUser,
        onUnauthorized,
    );
}


export async function removeFavorite(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: any) => void,
    courseId: number
) {
    return apiCall(`favorites/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    },
        setAccessToken,
        setUser,
        onUnauthorized,
    );
}

export async function toggleFavorite(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: any) => void,
    courseId: number,
    isFavorite: boolean
) {
    if (isFavorite) {
        return removeFavorite(accessToken, setAccessToken, onUnauthorized, setUser, courseId);
    } else {
        return addFavorite(accessToken, setAccessToken, onUnauthorized, setUser, courseId);
    }
}