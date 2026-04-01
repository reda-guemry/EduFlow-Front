import type { CourseCardProps } from "../types/cours";

function CartCours({
  course,
  setModalMode,
  setSelectedCourse,
  setShowForm,
  handleDeleteCourse,
  isFavorite = false,
  onToggleFavorite,
  student,
}: CourseCardProps) {
  const isTeacherView =
    setModalMode && setSelectedCourse && setShowForm && handleDeleteCourse;

  return (
    <>
      <div
        key={course.id}
        className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {course.title}
            </h2>

            <p className="text-sm text-blue-600 mt-1 font-medium">
              {course.category_name}
            </p>
          </div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            ${course.price}
          </span>

          {isTeacherView && (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setModalMode("edit");
                  setSelectedCourse(course);
                  setShowForm(true);
                }}
                className="cursor-pointer bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm font-medium"
              >
                Delete
              </button>
            </div>
          )}

          {student &&
            (isFavorite ? (
              <button
                onClick={() => onToggleFavorite?.(course.id, isFavorite)}
                className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold cursor-pointer "
              >
                Favorite
              </button>
            ) : (
              <button
                onClick={() => onToggleFavorite?.(course.id, isFavorite)}
                className="cursor-pointer bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 transition text-sm font-medium"
              >
                Add to Favorites
              </button>
            ))}
            
        </div>

        <p className="text-gray-600 mt-4">{course.description}</p>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Groups</h3>
          </div>

          <div className="space-y-3">
            {course.groups?.map((group) => (
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

        <div className="mt-6 flex justify-end">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            {student ? "Enroll Now" : "View Details"}
          </button>
        </div>
      </div>
    </>
  );
}

export default CartCours;
