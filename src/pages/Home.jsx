import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn
      ? `${authState.user.name}'s tasks`
      : 'Task Manager';
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white h-[60vh] flex flex-col justify-center items-center text-center p-8">
            <h1 className="text-4xl font-bold mb-4 animate-bounce">
              Welcome to Task Manager App
            </h1>
            <p className="text-lg mb-6">
              Organize your tasks and boost your productivity!
            </p>
            <Link
              to="/signup"
              className="mt-4 px-6 py-3 bg-white text-blue-600 font-semibold text-xl rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Join Now
              <span className="ml-2">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-gray-100 py-6 px-8 shadow-md rounded-lg mx-8 mt-8">
              <h1 className="text-2xl font-semibold text-gray-800">
                Welcome, <span className="text-blue-600">{authState.user.name}</span>!
              </h1>
              <p className="text-gray-600 mt-2">
                Here are your tasks for today. Stay productive!
              </p>
            </div>
            <div className="mt-6">
              <Tasks />
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;