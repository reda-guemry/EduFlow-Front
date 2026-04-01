import { useEffect, useState } from "react";
import { useAuth } from "../customhook/useAuth";
import { fetchFavorite, toggleFavorite } from "../services/favorite" ;
import type { Course } from "../types/cours";
import CartCours from "../components/CartCours";
import type { PaginatedResponse } from "../types/favorite";


function Favorite() {
  const { accessToken, setAccessToken, setUser, handleAuthError } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState<string>("");
  const [links, setLinks] = useState<PaginatedResponse['links'] | null >(null);
  const [meta, setMeta] = useState<PaginatedResponse['meta'] | null>(null);

  const ToggleFav = async (courseId: number , isFavorite: boolean) => {

    await toggleFavorite(
      accessToken,
      setAccessToken,
      handleAuthError,
      setUser,
      courseId,
      isFavorite
    );

    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
  } ; 

  useEffect(() => {
    document.title = "Favorite Courses - EduFlow";

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetchFavorite(
          accessToken,
          setAccessToken,
          handleAuthError,
          setUser,
          path ? path : undefined
        );

        console.log(response);

        setCourses(response.data);
        setLinks(response.links);
        setMeta(response.meta);

      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  const extractRelativePath = (url: string | null) => {
    if (!url) return "";

    const parsedUrl = new URL(url);
    return `${parsedUrl.pathname.replace("/api/", "")}${parsedUrl.search}`;
  };

  const handleNext = () => {
    if (links?.next) {
      setPath(extractRelativePath(links.next));
    }
  };

  const handlePrev = () => {
    if (links?.prev) {
      setPath(extractRelativePath(links.prev));
    }
  };

  return (
    <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
      <h1 className="text-center mb-4 font-bold text-3xl">Dashboard Student</h1>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <CartCours key={course.id} course={course} isFavorite={true} onToggleFavorite={ToggleFav} />
          ))
        ) : (
          <p>No favorite courses found.</p>
        )}
      </section>

      {!loading && meta && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm">
            Page {meta.current_page} / {meta.last_page}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={!links?.prev}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!links?.next}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Favorite;