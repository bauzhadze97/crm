import React from 'react';
import Sidebar from '../../components/Sidebar';
import { FaArrowRight, FaArrowDown, FaArrowUp, FaClock } from 'react-icons/fa';

import Oscar from '../../assets/images/oscar.png'
import Emy from '../../assets/images/emy.png'
import './index.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const { t } = useTranslation();
  const userData = useSelector(state => state.user.data);
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className='user-info-container'>
          <span className="user-info-2">{t("welcome")} {userData?.name}!</span>
        </div>
        <div className='flex justify-between'>
          <div className="workspace">
            <div className="section-header">
              <h2 className='text-[#005387] text-xl font-bold'>{t("spaces")}</h2>
            </div>
            <div className="cards-container">
              <Link to="/profile"  className="card flex-col">
                <div className='card-link text-center height-[100px]'>
                  {t("profile")}
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>
              </Link>
              <Link to="#" className="card flex-col">
                <div className='card-link text-center'>
                {t("notes")}
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>
              </Link>
              <Link to="/procurement" className="card flex-col">
                <div className='card-link text-center height-[40px]'>
                {t("internal_purchasment")}
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>
              </Link>
              <Link to="/vacation" className="card flex-col">
                <div className='card-link'>
                {t('vacation')}
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>
              </Link>
              <Link to="/business" className="card flex-col">
                <div className='card-link text-center'>
                {t('business_trip')}
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>
              </Link>
              <div className="card flex-col">
                <div className='card-link'>{t('hr_document')}</div>                 
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>
              </div>
              <div className="card flex flex-col">
                <div className='card-link'>{t('calendar')}</div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </div>
              <div className="card flex flex-col">
                <div className='card-link'>Leads</div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </div>
              <div className="card flex flex-col">
                <div className='card-link'>My Discount</div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </div>
            </div>
            
          </div>
          <div className='bg-[#fff] w-[400px] rounded-3xl flex flex-col items-center'>
            <div className='flex justify-between w-[100%] px-4 mt-8'>
              <h3 className='text-[#0A1629] text-2xl font-semibold'>{t('nearest_events')}</h3>
              <button className='text-[#105D8D] flex items-center text-center justify-center'>{t('view_all')} <FaArrowRight className='ml-2' /></button>
            </div>
            <div className='border-l-4 border-l-[#3F8CFF] w-[90%] px-2 ml-2 mt-10 space-y-10'>
                <div className='flex w-[100%] justify-between'>
                <h5 className='text-[#0A1629] font-semibold w-[180px]'>Presentation of the new department</h5>
                  <FaArrowUp className='text-[#FFBD21]'/>
                </div>
                <div className='flex w-[100%] justify-between'>
                  <h6 className='text-[#91929E] text-sm'>Today | 5:00 PM</h6>
                  <div className='text-[#105D8D] flex items-center space-x-2'>
                    <FaClock />
                    <strong className='text-xs'>4h</strong>
                  </div>
                </div>
            </div>
            <div className='border-l-4 border-l-[#DE92EB] w-[90%] px-2 ml-2 mt-4 space-y-10'>
                <div className='flex w-[100%] justify-between'>
                <h5 className='text-[#0A1629] font-semibold  w-[180px]'>Meeting of IT Department</h5>
                  <FaArrowDown className='text-[#FFBD21]'/>
                </div>
                <div className='flex w-[100%] justify-between'>
                  <h6 className='text-[#91929E] text-sm'>Today | 6:00 PM</h6>
                  <div className='text-[#105D8D] flex items-center space-x-2'>
                    <FaClock />
                    <strong className='text-xs'>4h</strong>
                  </div>
                </div>
            </div>
            <div className='border-l-4 border-l-[#0AC947] w-[90%] px-2 ml-2 my-4 space-y-10'>
                <div className='flex w-[100%] justify-between'>
                <h5 className='text-[#0A1629] font-semibold  w-[170px]'>Meeting of Project Team</h5>
                  <FaArrowDown className='text-[#FFBD21]'/>
                </div>
                <div className='flex w-[100%] justify-between'>
                  <h6 className='text-[#91929E] text-sm'>Tomorrow | 2:00 PM</h6>
                  <div className='text-[#105D8D] flex items-center space-x-2'>
                    <FaClock />
                    <strong className='text-xs'>4h</strong>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className='flex mt-4'>
          <div className="workspace">
            <div className="section-header">
              <h2 className='text-[#005387] text-xl font-bold'>{t('web')}</h2>
            </div>
            <div className="cards-container">
              <Link to="https://banks.gorgia.ge" target='_blank' className="card flex-col">
                <div className='card-link'>
                  Banks
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
              <Link to="https://jobs.gorgia.ge" target='_blank' className="card flex-col">
                <div  className='card-link'>
                  Jobs
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
              <Link to="https://sms.gorgia.ge" target='__blank' className="card flex-col">
                <div className='card-link'>
                  SMS
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
              <Link to="https://gorgup.com" target='_blank' className="card flex-col">
                <div  className='card-link'>
                  Gorgup
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
              <Link to="https://shemosvlebi.gorgia.ge" target='_blank' className="card flex-col">
                <div  className='card-link'>
                  Shemosvlebi
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
              <Link to="https://paletebi.gorgia.ge" target='_blank' className="card flex-col">
                <div  className='card-link'>
                  Paletebi
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
              <Link to="https://10.150.20.172/" target='_blank' className="card flex-col">
                <div  className='card-link'>
                  GPS
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
              <Link to="https://elearning.gorgia.ge" target='_blank' className="card flex-col">
                <div  className='card-link'>
                  Elearning
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
              <Link to="https://rent.gorgia.ge" target='_blank' className="card flex-col">
                <div  className='card-link'>
                  Rent
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
              <Link to="https://archive.gorgia.ge" target='_blank' className="card flex-col">
                <div  className='card-link'>
                  Archive
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
              <Link to="https://qrgorgia.ge/admin/login" target="_blank" className="card flex-col">
                <div  className='card-link'>
                  QR
                </div>
                <div className='text-xs font-normal px-2 py-1 rounded text-[#fff] bg-[#007DBE]'>{t('click_here')}</div>  
              </Link>
            </div>
          </div>   
          <div className='bg-[#fff] w-[400px] rounded-3xl flex flex-col relative'>
              <h3 className='mt-4 pl-4 text-xl font-semibold ml-2'>{t('chat_online')}</h3>
              <div className='flex w-[100%] items-center space-x-4 px-4 mt-4'>
                <img src={Oscar}  className='w-10 h-10 rounded-full'/>
                <div className='w-[100%] flex flex-col'>
                  <h4 className='text-[#0A1629] font-semibold'>Oscar Holloway</h4>
                  <h6 className='text-[#91929E]'>UI/UX Designer</h6>
                </div>
              </div>
              <div className='flex w-[100%] items-center space-x-4 px-4 mt-4'>
                <img src={Emy}  className='w-10 h-10 rounded-full'/>
                <div className='w-[100%] flex flex-col'>
                  <h4 className='text-[#0A1629] font-semibold'>Emy Smith</h4>
                  <h6 className='text-[#91929E]'>Project Manager</h6>
                </div>
              </div>
              <div className='flex w-[100%] items-center space-x-4 px-4 mt-4'>
                <img src={Oscar}  className='w-10 h-10 rounded-full'/>
                <div className='w-[100%] flex flex-col'>
                  <h4 className='text-[#0A1629] font-semibold'>Jacob Brown</h4>
                  <h6 className='text-[#91929E]'>IT Support</h6>
                </div>
              </div>
              <div className='flex w-[100%] items-center space-x-4 px-4 mt-4'>
                <img src={Emy}  className='w-10 h-10 rounded-full'/>
                <div className='w-[100%] flex flex-col'>
                  <h4 className='text-[#0A1629] font-semibold'>Kate Washington</h4>
                  <h6 className='text-[#91929E]'>Architect</h6>
                </div>
              </div>
              <div className='absolute bottom-5 text-[#105D8D] font-semibold left-[50%] translate-x-[-50%]'>{t('view_more')}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
