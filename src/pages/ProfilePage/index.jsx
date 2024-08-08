import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import './index.css';
import { changePassword, updateUser } from '../../services/user';
import useFetchUser  from '../../hooks/useFetchUser';
import { getDepartments } from '../../services/admin/department'
import { getDepartments as getDeps, getPurchaseDepartments } from '../../services/auth';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation()
  useFetchUser();
  const userData = useSelector(state => state.user.data) || {};
  const [departments, setDepartments] = useState([]);

  const [passForm, setPassForm] = useState({
    old_password: '',
    password: '',
    confirm_password: '',
  })
  const [passError, setPassError] = useState({
    old_password: '',
    password: '',
    confirm_password: '',
  });

  const [profileForm, setProfileForm] = useState({
    name: '',
    sur_name: '',
    position: '',
    department: '',
    location: '',
    working_start_date: '',
    date_of_birth: '',
    email: '',
    mobile_number: '',
    password: '',
  })
  const [profileError, setProfileError] = useState({
    position: '',
    department: '',
    location: '',
    working_start_date: '',
    date_of_birth: '',
    email: '',
    mobile_number: '',
    password: ''
  })

  useEffect(() => {
    const fetchDeparmtents = async () => {
      try {
        const res = await getDepartments();
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchDeparmtents();
  }, [])

  useEffect(() => {
    if(Object.keys(userData).length > 0) {
      setProfileForm({
        name: userData?.name || '',
        sur_name: userData?.sur_name || '',
        position: userData?.position || '',
        department: userData?.department?.name || '',
        location: userData?.location || '',
        working_start_date: userData?.working_start_date || '',
        date_of_birth: userData?.date_of_birth || '',
        email: userData?.email || '',
        mobile_number: userData?.mobile_number || '',
        password: '',
      });
    }

  }, [userData]);

  const handleChangePass = (e) => {
    const { name, value } = e.target;
    setPassForm({
      ...passForm,
      [name]: value
    });
  };

  const handleChangeProfile = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };

  const submitPassForm = async (e) => {
    e.preventDefault();

    try {
      setPassError({
        old_password: '',
        password: '',
        confirm_password: '',
      })
      const res = await changePassword(passForm);
      if(res.data.status === 401) {
        setPassError({old_password: res.data.message })
      } else {
        toast.success(res.data.message)
      }
    } catch(err) {
      for(const [key, value] of Object.entries(err.response.data)) {
        setPassError({...passError, [key]: value[0]})
        toast.error(value[0])
      }
    } 
  }

  const submitProfileForm = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser(profileForm);
      if(res.data.status === 401) {
        setPassError({old_password: res.data.message })
      } else {
        toast.success(res.data.message)
        setProfileError({
          position: '',
          department: '',
          location: '',
          working_start_date: '',
          date_of_birth: '',
          email: '',
          mobile_number: '',
          password: ''
        })
      }
    } catch(err) {
      for(const [key, value] of Object.entries(err.response.data)) {
        setProfileError({...passError, [key]: value[0]})
        toast.error(value[0])
      }
    } 
  }

  useEffect(() => {
    let departmentsArray = [];
    const fetchDeparmtents = async () => {
      try {
        const res = await getDeps();
        
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
    <div className="profile-dashboard-container">
      <Sidebar />
      <main className="profile-main-content">
        {/* <div className="user-info">
          <span>{t("welcome")} {userData?.name}!</span>
        </div> */}
        <div className='profile flex flex-row justify-around'>
          <div className="w-[400px] flex flex-col items-center">
            <div className="section-header">
              <h2 className='text-3xl font-bold'>{t("my_profile")}</h2>
            </div>
            <form className='profile-form' onSubmit={submitProfileForm}>
              <div className='profile-form-wrapper'>
                  <label>{t("position")}</label>
                  <input type="text" name="position" onChange={handleChangeProfile} value={profileForm.position} />
                  <p className='text-md text-[#D7443A] mb-4'>{profileError?.position}</p>
              </div> 

              <div className='profile-form-wrapper'>
                  <label>{t("department")}</label>
                  <select name="department_id" onChange={handleChangeProfile} className='p-4 mb-2 border border-[#105D8D] rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'>
                    { departments.map((dep) => {
                      return <option key={dep.id} selected={dep.id == userData?.department_id} value={dep.id}>{dep?.name}</option>
                    })}
                </select>
                <p className='text-md text-[#D7443A] mb-4'>{profileError?.department}</p>
              </div>
            

              <div className='profile-form-wrapper'>
                  <label>{t("position")}</label>
                  <input type="text" name="location" onChange={handleChangeProfile} value={profileForm.location} />
                  <p className='text-md text-[#D7443A] mb-4'>{profileError?.location}</p>
              </div>
            
              <div className='profile-form-wrapper'>
                  <label>{t("work_start_date")}</label>
                  <input type="date" name="working_start_date" onChange={handleChangeProfile} value={profileForm.working_start_date} />
                  <p className='text-md text-[#D7443A] mb-4'>{profileError?.working_start_date}</p>
              </div>
              

              <div className='profile-form-wrapper'>
                  <label>{t("birth_date")}</label>
                  <input type="date" name="date_of_birth" onChange={handleChangeProfile} value={profileForm.date_of_birth} /> 
                  <p className='text-md text-[#D7443A] mb-4'>{profileError?.date_of_birth}</p>   
              </div>
              

              <div className='profile-form-wrapper'>
                  <label>{t("email")}</label>
                  <input type="email" name="email" onChange={handleChangeProfile} value={profileForm.email} />
                  <p className='text-md text-[#D7443A] mb-4'>{profileError?.email}</p>
              </div>
            
              <div className='profile-form-wrapper'>
                  <label>{t("mobile_number")}</label>
                  <input type="text" name="mobile_number" onChange={handleChangeProfile} value={profileForm.mobile_number} /> 
                  <p className='text-md text-[#D7443A] mb-4'>{profileError?.mobile_number}</p>   
              </div>
              <div className='profile-form-wrapper'>
                <label>{t("password")}</label>
                <input type="password" name="password" onChange={handleChangeProfile} value={profileForm.password} placeholder='დაადასტურეთ მოქმედი პაროლი' />  
                <p className='text-md text-[#D7443A] mb-4'>{profileError?.password}</p>  
              </div>
              <button type="submit" className='bg-[#009fe3] w-[100%] h-[50px] rounded text-[#fff] hover:bg-[#009fe388]'>{t("save")}</button>
            </form>
          </div>
          <div className="w-[400px] flex flex-col items-center">
              <div className="section-header">
                <h2 className='text-3xl font-bold'>{t("password_change")}</h2>
              </div>
              <form onSubmit={submitPassForm}>
                <div className='profile-form-wrapper'>
                    <label>{t("old_password")}</label>
                    <input type="password" name="old_password" onChange={handleChangePass} />
                    <p className='text-md text-[#D7443A] mb-4'>{passError?.old_password}</p>
                    </div> 
                <div className='profile-form-wrapper'>
                    <label>{t("new_password")}</label>
                    <input type="password" name="password" onChange={handleChangePass} />
                    <p className='text-md text-[#D7443A] mb-4'>{passError?.password}</p>
                </div> 
                <div className='profile-form-wrapper'>
                    <label>{t("repeat_new_password")}</label>
                    <input type="password" name="confirm_password" onChange={handleChangePass} />
                    <p className='text-md text-[#D7443A] mb-4'>{passError?.confirm_password}</p>
                </div> 
                <button type="submit" className='bg-[#009fe3] w-[100%] h-[50px] rounded text-[#fff] hover:bg-[#009fe388]'>{t("change")}</button>
              </form>
            </div>     
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
