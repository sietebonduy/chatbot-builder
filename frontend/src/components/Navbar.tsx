import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MyApp</Link>

        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
