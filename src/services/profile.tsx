import { apiCall } from "./api";





export function fetchProfile(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: any) => void
) {
    return apiCall('profile', {
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
}


export function getCategories(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: any) => void
) {
    return apiCall('categories', {
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
}   



