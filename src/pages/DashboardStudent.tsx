import { useEffect, useState } from "react";
import { fetchCourses } from "../services/cours";
import { useAuth } from "../customhook/useAuth";
import type { Course } from "../types/cours";
import CartCours from "../components/CartCours";
import { fetchFavorite, toggleFavorite } from "../services/favorite";

export default function DashboardStudent() {
  const { accessToken, setAccessToken, setUser, handleAuthError } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteCourseIds, setFavoriteCourseIds] = useState<number[]>([]);

  const fetchCoursesData = async () => {
    try {
      const fetchData = async () => {
        const reponse = await fetchCourses(
          accessToken,
          setAccessToken,
          handleAuthError,
          setUser,
        );

        console.log(reponse);
        setCourses(reponse);
        setLoading(false);
      };

      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchFavoriteCourses = async () => {
    try {
      const fetchData = async () => {
        const reponse = await fetchFavorite(
          accessToken,
          setAccessToken,
          handleAuthError,
          setUser,
        );

        console.log(reponse);

        const favoriteIds = reponse.data.map((fav) => fav.id);
        setFavoriteCourseIds(favoriteIds);
      };

      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const ToggleFav = async (courseId: number, isFavorite: boolean) => {
    try {
      const respons = await toggleFavorite(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
        courseId,
        isFavorite,
      );

      setFavoriteCourseIds((prev) =>
        isFavorite ? prev.filter((id) => id !== courseId) : [...prev, courseId],
      );

      //   console.log(respons);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  //   console.log(user);
  useEffect(() => {
    document.title = "Dashboard Student - EduFlow";
    fetchCoursesData();
    fetchFavoriteCourses();
  }, []);

  return (
    <>
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <h1 className="text-center mb-4 font-bold text-3xl">
          Dashboard Student
        </h1>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading courses...</p>
          ) : (
            courses.map((course) => {
              let isFavorite = favoriteCourseIds.includes(course.id!);
              return (
                <CartCours
                  key={course.id}
                  course={course}
                  isFavorite={isFavorite}
                  onToggleFavorite={ToggleFav}
                  student={true}
                />
              );
            })
          )}
        </section>
      </main>
    </>
  );
}
