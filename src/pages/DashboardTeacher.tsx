import { useState, useEffect } from "react";
import { useAuth } from "../customhook/useAuth";
import type { Course, Category } from "../types/cours";
import { createCourse, fetchCourses } from "../services/cours";
import CartCours from "../components/CartCours";

function TeacherDashboard() {
  const { accessToken, setAccessToken, setUser, handleAuthError, user } = useAuth() ; 
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
  });

  const categories: Category[] = [{ id: 3, name: "Marketing" }];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const coursesFetch = async () => {
    try {
      const response = await fetchCourses(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
      );
      console.log(response);

      setCourses(response.courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.category_id
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (isNaN(Number(formData.category_id))) {
      alert("Please select a valid category.");
      return;
    }

    try {
      const courseData = await createCourse(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
        formData,
      );

      coursesFetch();

    } catch (error) {
      console.error("Failed to create course:", error);
      alert("Failed to create course. Please try again.");
      return;
    }

    setShowForm(false);
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
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Course
          </button>
        </div>

        {showForm && (
          <div className="mb-8 bg-white rounded-2xl shadow-md p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Create New Course
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-red-500 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleCreateCourse}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="md:col-span-1">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course title"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course price"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course description"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course) => <CartCours key={course.id} course={course} />)}
        </section>
      </main>
    </>
  );
}

export default TeacherDashboard;
