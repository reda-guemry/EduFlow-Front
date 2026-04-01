import type { User } from "../types/auth";
import type { Course, CourseDetails, TeacherCoursesResponse } from "../types/cours";
import { apiCall } from "./api";



export async function fetchCoursesByTeacher(

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


export async function updateCourse(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: User | null) => void,
    courseId: number,
    data: {},
): Promise<Course> {
    return apiCall<Course>(`courses/${courseId}`, {
        method: "PUT",
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

export async function deleteCourse(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: User | null) => void,
    courseId: number,
): Promise<void> {
    return apiCall<void>(`courses/${courseId}`, {
        method: "DELETE",
        accessToken: accessToken,
        headers: {
            "Accept": "application/json",
        },
    },
    setAccessToken ,
    setUser, 
    onUnauthorized ,
    )
}



export async function fetchCourses(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: User | null) => void
){
    return apiCall<Course[]>('courses', {
        method: "GET",
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


export async function fetchCourseById(
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    onUnauthorized: () => void,
    setUser: (user: User | null) => void,
    courseId: number
){
    return apiCall<CourseDetails>(`courses/${courseId}`, {
        method: "GET",
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

