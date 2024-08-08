import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth';
import { toast } from 'react-toastify';

import './index.css';
import { getDepartments, getPurchaseDepartments } from '../../services/auth';

const SignUpPage = () => {
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([]);
  const [step, setStep] = useState(1);
  const [activeInput, setActiveInput] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    sur_name: '',
    email: '',
    date_of_birth: '',
    mobile_number: '',
    department_id: '',
    position: '',
    location: '',
    working_start_date: '',
    password: '',
    confirm_password: ''
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);

      if(res) { 
        toast.success(res.data.message)
        navigate('/');
      }
    } catch(err) {
      if(err.response) {
        const arr = Object.keys(err?.response?.data) 
        for(let i=0; i<arr.length; i++) {
          toast.error(err.response.data[arr[i]][0])
        }
      }
      
    }
  };

  useEffect(() => {
    let departmentsArray = [];
    const fetchDeparmtents = async () => {
      try {
        const res = await getDepartments();
        
        departmentsArray = [...departmentsArray, ...res.data.departments]
      } catch (err) {
        console.error(err);
      } finally {
        setDepartments(departmentsArray)
      }
    }

    const fetchPurchaseDepartments = async () => {
      try {
        const res = await getPurchaseDepartments();
       
        departmentsArray = [...departmentsArray, ...res.data.departments]
      } catch (err) {
        console.error(err);
      } finally {
        setDepartments(departmentsArray)
      }    
    }

    fetchDeparmtents();
    fetchPurchaseDepartments()
  }, [])

  return (
    <div className="sign-up-container">
      <div className="left-panel">
        <Link className='back-button text-medium' to='/'>Back To Login</Link>
        <h2 className='text-xl font-semibold'>Registration</h2>
        {
        step === 1 ?  
        <ul>
            <li className={activeInput === 0 ? 'active' : ''}><div className={`circle-div ${activeInput === 0 ? 'active' : ''}`}/>Name</li>
            <li className={activeInput === 1 ? 'active' : ''}><div className={`circle-div ${activeInput === 1 ? 'active' : ''}`}/>Surname</li>
            <li className={activeInput === 2 ? 'active' : ''}><div className={`circle-div ${activeInput === 2 ? 'active' : ''}`}/>Email</li>
            <li className={activeInput === 3 ? 'active' : ''}><div className={`circle-div ${activeInput === 3 ? 'active' : ''}`}/>Date of Birth</li>
            <li className={activeInput === 4 ? 'active' : ''}><div className={`circle-div ${activeInput === 4 ? 'active' : ''}`}/>Phone Number</li>
            <li className={activeInput === 5 ? 'active' : ''}><div className={`circle-div ${activeInput === 5 ? 'active' : ''}`}/>Password</li>
            <li className={activeInput === 6 ? 'active' : ''}><div className={`circle-div ${activeInput === 6 ? 'active' : ''}`}/>Confirm Password</li>
        </ul>
        : 
        <ul>
            <li className={activeInput === 0 ? 'active' : ''}><div className={`circle-div ${activeInput === 0 ? 'active' : ''}`}/>Department</li>
            <li className={activeInput === 1 ? 'active' : ''}><div className={`circle-div ${activeInput === 1 ? 'active' : ''}`}/>Position</li>
            <li className={activeInput === 2 ? 'active' : ''}><div className={`circle-div ${activeInput === 2 ? 'active' : ''}`}/>Location</li>
            <li className={activeInput === 3 ? 'active' : ''}><div className={`circle-div ${activeInput === 3 ? 'active' : ''}`}/>Working Start Date</li>
        </ul>
        }
      </div>
      <div className="right-panel">
        <form onSubmit={handleSubmit} className='signup-form'>
          {step === 1 && (
            <div className="form-step">
              <label className="form-first">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setActiveInput(0)}
              />

              <label>Surname</label>
              <input
                type="text"
                name="sur_name"
                value={formData.sur_name}
                onChange={handleChange}
                onFocus={() => setActiveInput(1)}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setActiveInput(2)}
              />

              <label>Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                onFocus={() => setActiveInput(3)}
              />

              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                onFocus={() => setActiveInput(4)}
              />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setActiveInput(5)}
                />

            <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    onFocus={() => setActiveInput(6)}
                />
              
              <button type="button" onClick={handleNextStep}>Next Step</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <label>Department</label>
              <select onFocus={() => setActiveInput(0)} name="department_id" onChange={handleChange} className='p-4 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'>
                  <option>აირჩიე დეპარტამენტი</option>
                { departments.map((dep) => {
                  return <option value={dep.id}>{dep.name}</option>
                })}
              </select>
              {/* <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
              /> */}

              <label>Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                onFocus={() => setActiveInput(1)}
              />

              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onFocus={() => setActiveInput(2)}
              />

              <label>Working Start Date</label>
              <input
                type="date"
                name="working_start_date"
                value={formData.working_start_date}
                onChange={handleChange}
                onFocus={() => setActiveInput(3)}
              />
            
            <div className='last-buttons'>
                <button type="button" onClick={handlePreviousStep}>Previous</button>
                <button type="submit">Submit</button>
            </div>
            
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
