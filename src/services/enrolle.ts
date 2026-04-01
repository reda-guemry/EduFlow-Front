import type { User } from "../types/auth";
import { apiCall } from "./api";




export function enrollInCourse(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: User | null) => void,
    courseId: number,
): Promise<any> {
    return apiCall(`courses/${courseId}/purchase`, {
        method: "POST",
        accessToken: accessToken,
        headers: {
            "Accept": "application/json",
        },
    },
    setAccessToken , 
    setUser,
    onUnauthorized ,
    );
}


export function getPaymentLink(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: User | null) => void,
    purchase: number,
): Promise<any> {
    return apiCall(`purchases/${purchase}/checkout-session`, {
        method: "POST",
        accessToken: accessToken,
        headers: {
            "Accept": "application/json",
        },
    },
    setAccessToken , 
    setUser,
    onUnauthorized ,
    );
}



