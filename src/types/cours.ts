import type { User } from "./auth";

export type GroupProgress = {
  id: number;
  name: string;
  course_id: number;
  students? : User [];
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