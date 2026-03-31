import { useEffect, useState } from "react"
import { fetchCourses } from "../services/cours";
import { useAuth } from "../customhook/useAuth";
import type { Course } from "../types/cours";
import CartCours from "../components/CartCours";



export default function DashboardStudent() {

    const { accessToken, setAccessToken , setUser , handleAuthError } = useAuth() ;
    const [ courses , setCourses] = useState<Course[]>([]) ;

    useEffect(() => {
        document.title = "Dashboard Student - EduFlow";

        try {
            const fetchData = async () => {
                const reponse = await fetchCourses(
                    accessToken,
                    setAccessToken,
                    handleAuthError,
                    setUser,
                ) ; 

                console.log(reponse);
                setCourses(reponse); ;    
            }

            fetchData() ;
        }catch (error) {
            console.error("Error fetching data:", error);
        }

    } , [])
    

    return (
        <div>
            <h1>Dashboard Student</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <CartCours key={course.id} course={course}  />
                ))}
            </div>

        </div>
    )
}