import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const SignupForm = () => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });

  }

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <form className='m-auto my-16 max-w-[500px] p-8 bg-white border-2 shadow-2xl rounded-md transform transition-all hover:scale-105 hover:shadow-3xl'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-4 text-2xl font-bold text-gray-700'>Welcome user, please signup here</h2>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-600 font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
              <Input type="text" name="name" id="name" value={formData.name} placeholder="Your name" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary" />
              {fieldError("name")}
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
              <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary" />
              {fieldError("email")}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600 font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} className="w-full px-4 py-2 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary" />
              {fieldError("password")}
            </div>

            <button className='w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 font-medium rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl' onClick={handleSubmit}>Submit</button>

            <div className='pt-4 text-center'>
              <Link to="/login" className='text-blue-500 hover:underline'>Already have an account? Login here</Link>
            </div>
          </>
        )}

      </form>
    </>
  )
}

export default SignupForm