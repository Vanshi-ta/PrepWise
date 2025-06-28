import { logout } from '../lib/auth';

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-lg">Interview Practice</h1>
      <button onClick={logout} className="bg-red-500 p-2 rounded">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
