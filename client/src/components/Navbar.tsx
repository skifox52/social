import { Link } from "react-router-dom"
function Navbar() {
  return (
    <nav className="bg-gray-900 flex items-center w-full justify-between flex-wrap p-6 mb-16">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Social</span>
      </div>
      <div className="w-full block lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            to="/login"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
