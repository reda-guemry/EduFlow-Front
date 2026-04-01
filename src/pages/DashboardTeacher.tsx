import { useState, useEffect } from "react";
import { useAuth } from "../customhook/useAuth";
import type { Course, Category, CourseFormData } from "../types/cours";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  fetchCoursesByTeacher,
} from "../services/cours";
import CartCours from "../components/CartCours";
import CourseFormModal from "../components/CourseFormModal";

function TeacherDashboard() {
  const { accessToken, setAccessToken, setUser, handleAuthError } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedCourse, setSelectedCourse] = useState<CourseFormData | null>(
    null,
  );
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category_id: 0,
  });

  const categories: Category[] = [{ id: 3, name: "Marketing" }];

  const coursesFetch = async () => {
    try {
      const response = await fetchCoursesByTeacher(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
      );
      //   console.log(response);

      setCourses(response.courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      category_id: Number(formData.get("category_id")),
    };

    try {
      const newCourse = await createCourse(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
        data,
      );

      setCourses((prev) => [...prev, newCourse]);
      coursesFetch();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  const handleUpdateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(selectedCourse);
    // return ;

    if (!selectedCourse) return;

    try {
      await updateCourse(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
        selectedCourse.id!,
        formdata,
      );
    } catch (error) {
      console.error("Failed to update course:", error);
    } finally {
      setShowForm(false);
      setSelectedCourse(null);
      coursesFetch();
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );
    if (!confirmDelete) return;

    try {
      await deleteCourse(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
        courseId,
      );
      coursesFetch();
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  useEffect(() => {
    coursesFetch();
  }, []);

  return (
    <>
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your courses, groups and progress
            </p>
          </div>

          <button
            onClick={() => {
              setFormMode("create");
              setSelectedCourse(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Course
          </button>
        </div>

        <CourseFormModal
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            setSelectedCourse(null);
          }}
          formdata={formdata}
          categories={categories}
          onSubmit={
            formMode === "create" ? handleCreateCourse : handleUpdateCourse
          }
          setFormData={setFormData}
          mode={formMode}
          initialData={selectedCourse || undefined}
        />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
            <p>Loading courses...</p>
          ) : (
            courses.map((course) => (
              <CartCours
                key={course.id}
                course={course}
                setModalMode={setFormMode}
                setSelectedCourse={setSelectedCourse}
                setShowForm={setShowForm}
                handleDeleteCourse={handleDeleteCourse}
                student={false}
              />
            ))
          )}
        </section>
      </main>
    </>
  );
}

export default TeacherDashboard;
