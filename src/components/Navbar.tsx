
function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-600">TeacherSpace</h1>
        </div>

        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <button className="hover:text-blue-600 transition">Dashboard</button>
          <button className="hover:text-blue-600 transition">My Courses</button>
          <button className="hover:text-blue-600 transition">Students</button>
          <button className="hover:text-red-600 transition">Logout</button>
        </div>
      </div>
    </nav>
  );
}


export default Navbar ;