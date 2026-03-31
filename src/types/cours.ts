import type { User } from "./auth";

export type GroupProgress = {
    id: number;
    name: string;
    course_id: number;
    students?: User[];
};

export type Course = {
    id: number;
    title: string;
    description: string;
    price: number;
    category_id: number;
    category_name: string;
    groups?: GroupProgress[];
};

export type Category = {
    id: number;
    name: string;
};


export type TeacherCoursesResponse = {
    courses: Course[];
};

export type CourseFormData = {
    id?: number;
    title: string;
    description: string;
    price: number;
    category_id: number;
};

export type CourseCardProps = {
    course: Course;
    setModalMode: React.Dispatch<React.SetStateAction<"create" | "edit">>;
    setSelectedCourse: React.Dispatch<React.SetStateAction<CourseFormData | null>>;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteCourse: (courseId: number) => void; 
}

