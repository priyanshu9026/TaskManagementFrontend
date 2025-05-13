import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="flex justify-between sticky top-0 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg items-center text-white z-50">
        <h2 className="cursor-pointer uppercase font-bold text-lg">
          <Link to="/" className="hover:text-gray-200 transition">Task Manager</Link>
        </h2>
        <ul className="hidden md:flex gap-6 uppercase font-medium items-center">
          {authState.isLoggedIn ? (
            <>
              <li className="bg-white text-blue-500 hover:bg-gray-100 font-medium rounded-md transition">
                <Link to="/tasks/add" className="block w-full h-full px-4 py-2 flex items-center gap-2">
                  <i className="fa-solid fa-plus"></i> Add Task
                </Link>
              </li>
              <li
                className="py-2 px-4 cursor-pointer hover:bg-gray-100 hover:text-gray-800 transition rounded-md"
                onClick={handleLogoutClick}
              >
                Logout
              </li>
            </>
          ) : (
            <li className="py-2 px-4 cursor-pointer bg-white text-blue-500 hover:bg-gray-100 transition rounded-md">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        <span className="md:hidden cursor-pointer text-2xl" onClick={toggleNavbar}>
          <i className="fa-solid fa-bars"></i>
        </span>

        {/* Navbar displayed as sidebar on smaller screens */}
        <div
          className={`absolute md:hidden right-0 top-0 bottom-0 transition-transform duration-300 ${
            isNavbarOpen ? 'translate-x-0' : 'translate-x-full'
          } bg-white shadow-lg w-screen sm:w-8/12 h-screen z-40`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="uppercase font-bold text-lg text-blue-500">
              <Link to="/" onClick={toggleNavbar}>
                Task Manager
              </Link>
            </h2>
            <span className="cursor-pointer text-2xl text-gray-600" onClick={toggleNavbar}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <ul className="flex flex-col gap-6 uppercase font-medium text-center mt-8">
            {authState.isLoggedIn ? (
              <>
                <li className="bg-blue-500 text-white hover:bg-blue-600 font-medium transition py-3 px-4 rounded-md">
                  <Link to="/tasks/add" className="block w-full h-full" onClick={toggleNavbar}>
                    <i className="fa-solid fa-plus"></i> Add Task
                  </Link>
                </li>
                <li
                  className="py-3 px-4 cursor-pointer hover:bg-gray-100 hover:text-gray-800 transition rounded-md"
                  onClick={() => {
                    handleLogoutClick();
                    toggleNavbar();
                  }}
                >
                  Logout
                </li>
              </>
            ) : (
              <li className="py-3 px-4 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition rounded-md">
                <Link to="/login" onClick={toggleNavbar}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;