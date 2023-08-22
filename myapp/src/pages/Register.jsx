import React, { useState } from 'react';
import './Register.css';
import Header from '../components/Layouts/Header';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
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
      const response = await axios.post('http://localhost:3999/v1/createuser',formData)
      if(response.data.success){

        toast("Registered successfully");
        return
      }
      toast(response.data.message);
      console.log('Form data:', formData);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.name) {
      errors.name = 'Name is required';
    }

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

    if (!data.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(data.phone)) {
      errors.phone = 'Invalid phone number format';
    }

    if (!data.address) {
      errors.address = 'Address is required';
    }

    return errors;
  };

  return (
    <div className='mainContainer'>
        <ToastContainer />
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
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
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
