import type { TeacherCoursesResponse } from "../types/cours";
import { apiCall } from "./api";



export async function fetchCourses(

    accesToken: string | null,
    setAccessToken: (token: string | null) => void, 
    onUnauthorized: () => void , 

): Promise<TeacherCoursesResponse> {
    return apiCall<TeacherCoursesResponse>('/courses', {
        method: "GET",
        accessToken: accesToken,
    },
        setAccessToken,
        onUnauthorized
    );

}