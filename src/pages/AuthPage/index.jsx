import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthImage from '../../assets/images/auth.png'
import GorgiaLogo from '../../assets/images/logo.png'
import './index.css';
import { loginUser } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { fetchUserSuccess } from '../../store/slices/userSlice';

import { toast } from 'react-toastify';

const AuthPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      if(res.data.status !== 200) {
        setError(res.data.message)
      } else {
        dispatch(fetchUserSuccess(res.data.user));
        localStorage.setItem('token', res.data.token);
        toast.success(res.data.message)
        navigate('/dashboard')
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="left-panel">
        <h1>Your place to work</h1>
        <p>Plan. Create. Control.</p>
        <div className="kanban-image">
          <img src={AuthImage} alt="illustration" />
        </div>
      </div>
      <div className="right-panel">
        <div className='logo' style={{ zIndex: 10}}>
            <img src={GorgiaLogo} alt="CRM Gorgia" />
            <h2>Sign In to CRM Gorgia</h2>
        </div>
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input className="sign-input" type="email" name="email" placeholder="youremail@gmail.com" onChange={handleChange} />
          
          <label>Password</label>
          <input  className="sign-input" type="password" name="password" placeholder="Password" onChange={handleChange} />
          <p className='text-md text-[#D7443A] mb-4'>{error}</p>
          <div className="options">
            <label className='auth-remember'>
              <input type="checkbox" /> <div>Remember me</div>
            </label>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit">Sign In</button>
          <p className="sign-up-link">Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
