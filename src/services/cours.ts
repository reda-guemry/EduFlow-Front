import type { User } from "../types/auth";
import type { TeacherCoursesResponse } from "../types/cours";
import { apiCall } from "./api";



export async function fetchCourses(

    accesToken: string | null,
    setAccessToken: (token: string | null) => void, 
    onUnauthorized: () => void , 
    setUser: (user: User | null) => void

): Promise<TeacherCoursesResponse> {
    return apiCall<TeacherCoursesResponse>('courses', {
        method: "GET",
        accessToken: accesToken,
        headers: {
            "Accept": "application/json",
        } , 
    },
        setAccessToken,
        setUser ,
        onUnauthorized, 
    );

}