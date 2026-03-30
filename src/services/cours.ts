import type { User } from "../types/auth";
import type { Course, TeacherCoursesResponse } from "../types/cours";
import { apiCall } from "./api";



export async function fetchCourses(

    accesToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: User | null) => void

): Promise<TeacherCoursesResponse> {
    return apiCall<TeacherCoursesResponse>('teacher/courses', {
        method: "GET",
        accessToken: accesToken,
        headers: {
            "Accept": "application/json",
        },
    },
        setAccessToken,
        setUser,
        onUnauthorized,
    );

}



export async function createCourse(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: User | null) => void,
    data: {}, 
): Promise<Course> {
    return apiCall<Course>('courses', {
        method: "POST",
        accessToken: accessToken,
        headers: {
            "Accept": "application/json",
        },
        body: data,
    },
    setAccessToken ,
    setUser, 
    onUnauthorized ,
    )
}

