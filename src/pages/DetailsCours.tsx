import { useParams } from "react-router-dom";
import { fetchCourseById } from "../services/cours";
import { useAuth } from "../customhook/useAuth";
import { use, useEffect, useState } from "react";
import type { Course, CourseDetails } from "../types/cours";
import { enrollInCourse, getPaymentLink } from "../services/enrolle";

function DetailsCours() {
  const { setAccessToken, setUser, accessToken, handleAuthError } = useAuth();
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetails | null>(null);

  const courseData = async () => {
    try {
      const response = await fetchCourseById(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
        Number(id),
      );

      console.log(response);
      setCourse(response);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };


  const getPayment = async (purchaseId: number) => {
    try {
      const response = await getPaymentLink(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
        purchaseId ,
        );

        console.log(response);
        
        if (response && response.data.checkout_url) {
            window.location.href = response.data.checkout_url;
        }


    } catch (error) {
        console.error("Error getting payment link:", error);
        alert("Failed to get payment link.");
        }
    };



  const enrollCourse = async () => {
    try {
      const response = await enrollInCourse(
        accessToken,
        setAccessToken,
        handleAuthError,
        setUser,
        Number(id),
      );

      console.log(response);

      getPayment(response.data.id);

    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Failed to enroll in the course. Please try again.");
    }
  };

  useEffect(() => {
    courseData();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Course Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-2">{course?.title}</h2>
        <p className="text-gray-700 mb-4">{course?.description}</p>
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            ${course?.price.toFixed(2)}
          </span>
          <span className="text-sm text-blue-600 font-medium">
            Category: {course?.category.name}
          </span>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            onClick={enrollCourse}
          >
            Enroll Now
          </button>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Groups</h3>
          </div>

          <div className="space-y-3">
            {course?.groups?.map((group) => (
              <div key={group.id} className="bg-gray-50 rounded-xl p-3 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">
                    {group.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    {((group.students ? group.students.length : 0) / 25) * 100}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${((group.students ? group.students.length : 0) / 25) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsCours;
