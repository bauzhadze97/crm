import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthImage from '../../assets/images/auth.png'
import GorgiaLogo from '../../assets/images/logo.png'
import './index.css';
import { forgotPassword } from '../../services/auth';

const AccountPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });
  const [error, setError] = useState('');

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
      const res = await forgotPassword(formData);
      if(res.data.status !== 200) {
        setError(res.data.message)
      } else {
        localStorage.setItem('token', res.data.token);
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
    
          <p className='text-md text-[#D7443A] mb-4'>{error}</p>
          
          <button type="submit">Reset Password</button>
          <p className="sign-up-link">Do you have an account? <Link to="/" className='text-[#009FE3]'>Sign In</Link></p>
          <p className="sign-up-link">Don't have an account? <Link to="/sign-up" className='text-[#009FE3]'>Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default AccountPage;
