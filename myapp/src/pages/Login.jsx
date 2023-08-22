import React, { useState } from 'react';
import './Register.css';
import Header from '../components/Layouts/Header';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
 
    email: '',
    password: '',
  
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
        const response = await axios.post('http://localhost:3999/v1/login',formData)
        console.log(response)
        if(response.data.success){
          toast("Login successful");
          localStorage.setItem("token",response.data.token)
          navigate("/home")
          
        }
        else{
        toast(response.data.message);
        }
       
    }
  };

  const validateForm = (data) => {
    const errors = {};


    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 10) {
      errors.password = 'Password must be at least 10 characters';
    }

 

    return errors;
  };

  return (
    <div className='mainContainer'>
           <ToastContainer />
    <div className="register-container">
      <h2>Login</h2>
      <form className="register-form" onSubmit={handleSubmit}>
      
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
      
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
