import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';
import { useEffect } from 'react';

const LoginForm = ({ redirectUrl }) => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [authState, redirectUrl, isLoggedIn, navigate]);

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  }

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <form className='m-auto my-16 max-w-[500px] bg-gradient-to-r from-blue-50 to-blue-100 p-8 border-2 shadow-lg rounded-lg'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-6 text-2xl font-bold text-gray-700'>Welcome Back!</h2>
            <p className='text-center mb-6 text-gray-500'>Please login to continue</p>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
              <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {fieldError("email")}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {fieldError("password")}
            </div>

            <button className='w-full bg-blue-500 text-white px-4 py-2 font-medium rounded-md hover:bg-blue-600 transition duration-300' onClick={handleSubmit}>Login</button>

            <div className='pt-6 text-center'>
              <Link to="/signup" className='text-blue-500 hover:underline'>Don't have an account? Signup here</Link>
            </div>
          </>
        )}
      </form>
    </>
  )
}

export default LoginForm