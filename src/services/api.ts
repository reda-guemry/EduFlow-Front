import type { ApiOptions } from "../types/apiOption";
import { ApiError } from "../types/eureur";
import { refreshAccessToken } from "./authService";





export async function api<T>(endpoint: string, options: ApiOptions, setAccessToken: (token: string | null) => void): Promise<T> {
    const {
        method = "GET",
        accessToken = null,
        body,
        headers = {},
        retry = false,
    } = options;

    const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
        method,
        credentials: "include",
        headers: {
            ...headers,
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...(body ? { "Content-Type": "application/json" } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const data = await response.json().catch(() => null);

    if (response.ok) {
        return data;
    }

    if (retry && response.status === 401 && endpoint !== 'refresh-token' && setAccessToken) {
        const newaccesToken = await refreshAccessToken() ; 

        setAccessToken(newaccesToken) ;

        return api<T>(endpoint, { ...options, accessToken: newaccesToken, retry: true }, setAccessToken);

    }


    throw new ApiError(data.message || "API request failed", response.status, data);

};



