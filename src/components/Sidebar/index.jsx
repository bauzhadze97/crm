import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import GorgiaLogo from '../../assets/images/logo.png'
import SidebarIcon from '../../assets/images/sidebar-icon.svg'
import LogoutIcon from '../../assets/images/logout.svg'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Badge } from '@mui/material'; // Import Badge component
import './index.css';
import { logoutUser } from '../../services/auth';
import { clearUser } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';
import KaImg from '../../assets/images/ka.png'
import EnImg from '../../assets/images/en.png'
import { getDailyList } from '../../services/daily'; // Import the service to fetch the daily list

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);
    const [newTaskCount, setNewTaskCount] = useState(0); // State for new tasks count
    const userInfo = useSelector((state) => state.user.data)

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

    useEffect(() => {
      if(window.innerWidth <= 600) {
        setIsVisible(false);
      }
    }, [window.innerWidth])

    // Fetch new tasks count
    useEffect(() => {
      const fetchNewTaskCount = async () => {
        try {
          const response = await getDailyList(1, 100); // Adjust the pagination parameters as needed
          const newTasks = response.data.data.filter(daily => {
            const createdAt = new Date(daily.created_at);
            const now = new Date();
            const diffInHours = Math.abs(now - createdAt) / 36e5; // difference in hours
            return diffInHours <= 24; // "new" if created in the last 24 hours
          });
          setNewTaskCount(newTasks.length);
        } catch (error) {
          console.error('Error fetching new task count:', error);
        }
      };

      fetchNewTaskCount();
    }, []);

    const handleLogout = async () => {
      try {
        const res = await logoutUser()
        dispatch(clearUser());
        toast.success(res.data.message);
        localStorage.removeItem('token')
        navigate('/')
      } catch(err) {
        console.error(err);
      }
    }

    if(isVisible) {
    return (
        <aside className="sidebar border-[3px] border-[#105D8D]">
        <div className="logo">
          {
            isVisible &&
            <button onClick={() => setIsVisible(false)} className='close-btn'>X</button>
          }
          <img src={GorgiaLogo} alt="CRM Gorgia" onClick={() => navigate('/dashboard')} className='cursor-pointer max-w-[80%]'/>
        </div>
        <nav className="menu">
          <ul className="overflow-y-scroll max-h-[70vh] custom-scrollbar">
            {userInfo?.type === 'admin' && <Link to={'/admin?activeSide=departments'} className={`${location.pathname === '/admin' ? 'active' : ''}`}>{location.pathname === '/admin' && <img src={SidebarIcon} alt="admin" />}<span className={`${location.pathname !== '/admin' ? 'animate-link' : ''}`}>{t("admin_panel")}</span></Link>}
            <Link to={'/dashboard'} className={`${location.pathname === '/dashboard' ? 'active' : ''}`}>{location.pathname === '/dashboard' && <img src={SidebarIcon} alt="Dashboard" />}<span className={`${location.pathname !== '/dashboard' ? 'animate-link' : ''}`}>{t("dashboard")}</span></Link>
            <Link to={'/head'} className={`${location.pathname === '/head' ? 'active' : ''}`}>{location.pathname === '/head' && <img src={SidebarIcon} alt="Profile" />}<span className={`${location.pathname !== '/head' ? 'animate-link' : ''}`}>{t("approvals")}</span></Link>
            <Link to={'/profile'} className={`${location.pathname === '/profile' ? 'active' : ''}`}>{location.pathname === '/profile' && <img src={SidebarIcon} alt="Profile" />}<span className={`${location.pathname !== '/profile' ? 'animate-link' : ''}`}>{t("profile")}</span></Link>
            <Link to={'/vacation'} className={`${location.pathname === '/vacation' ? 'active' : ''}`}>{location.pathname === '/vacation' && <img src={SidebarIcon} alt="Vacation" />}<span className={`${location.pathname !== '/vacation' ? 'animate-link' : ''}`}>{t("vacation")}</span></Link>
            <Link to={'/business'} className={`${location.pathname === '/business' ? 'active' : ''}`}>{location.pathname === '/business' && <img src={SidebarIcon} alt="Business" />}<span className={`${location.pathname !== '/business' ? 'animate-link' : ''}`}>{t("business_trip")}</span></Link>
            <Link to={'/procurement'} className={`${location.pathname === '/procurement' ? 'active' : ''}`}>{location.pathname === '/procurement' && <img src={SidebarIcon} alt="Procurement" />}<span className={`${location.pathname !== '/procurement' ? 'animate-link' : ''}`}>{t("internal_purchasment")}</span></Link>
            <Link to={'/calendar'}><span className={`${location.pathname !== '/procurement' ? 'animate-link' : ''}`}>{t("calendar")}</span></Link>
            <Link to={'#'}><span className={`${location.pathname !== '/procurement' ? 'animate-link' : ''}`}>{t("my_discount")}</span></Link>
            <Link to={'/hr-docs'}><span className={`${location.pathname !== '/procurement' ? 'animate-link' : ''}`}>{t("hr_document")}</span></Link>
            <Link to={'#'}><span className={`${location.pathname !== '/procurement' ? 'animate-link' : ''}`}>Lead Gorgia</span></Link>
            <Link to={'/daily-tasks'} className={`${location.pathname === '/daily-tasks' ? 'active' : ''}`}>
              {location.pathname === '/daily-tasks' && <img src={SidebarIcon} alt="Daily Task Results" />}
              <Badge badgeContent={newTaskCount} color="error" >
                <span className={`${location.pathname !== '/daily-tasks' ? 'animate-link' : ''}`} sx={{ margin: '0 0 0 0'}}>{t("საკითხების დაფა")}</span>
              </Badge>
            </Link>
            {/* <Link>Notes</Link> */}
            <Link to="https://gorgup.com/" target='_blank'><span className='animate-link'>Gorgup</span></Link>
            <Link to="http://sms.gorgia.ge/login" target='_blank'><span className='animate-link'>SMS Gorgia</span></Link>
            <Link to="https://banks.gorgia.ge/statement"  target='_blank'><span className='animate-link'>Banks Gorgia</span></Link>
            <Link to="https://10.150.20.172/login" target='_blank'><span className='animate-link'>GPS Gorgia</span></Link>
            <Link to="https://jobs.gorgia.ge/" target='_blank'><span className='animate-link'>Jobs Gorgia</span></Link>
            <Link to="http://shemosvlebi.gorgia.ge/" target='_blank'><span className='animate-link'>Shemosvlebi Gorgia</span></Link>
            <Link to="https://paletebi.gorgia.ge/admin/login" target='_blank'><span className='animate-link'>Paletebi Gorgia</span></Link>
            <Link to="https://archive.gorgia.ge/" target='_blank'><span className='animate-link'>Archive Gorgia</span></Link>
            <Link to="https://elearning.gorgia.ge/" target='_blank'><span className='animate-link'>Elearning Gorgia</span></Link>
            <Link to="https://rent.gorgia.ge" target='_blank'><span className='animate-link'>Rent Gorgia</span></Link>
            <Link to="https://qrgorgia.ge/admin/login" target='_blank'><span className='animate-link'>QR Gorgia</span></Link>
            {/* <Link>Support Ticket</Link> */}
            {/* <Link>Online Chat</Link> */}
          </ul>
        </nav>
        <div className="support ml-4">
          {i18n.language === 'en' ? <img src={KaImg} alt="language" onClick={() => changeLanguage('ka')} className='language-btn'/> : <img src={EnImg} onClick={() => changeLanguage('en')} alt="language" className='language-btn'/>}
          <button onClick={() => handleLogout()} className="logout-btn"><img src={LogoutIcon} alt="Logout" />{t("log_out")}</button>
        </div>
      </aside>
    ) } else {
      return <button className='sidebar-opener' onClick={() => setIsVisible(true)}>Navigation</button>
    }
}
