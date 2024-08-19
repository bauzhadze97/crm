import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/Sidebar';
import './index.css';
import { createDaily } from '../../services/daily';
import { forgotPassword, getDepartments } from '../../services/auth';
import { Button } from '@mui/material';




const DailyTaskReportPage = () => {
    const [formData, setFormData] = useState({
        reportTitle: '',
        selectDate: new Date().toISOString().split('T')[0], 
        description: '',
        link: '',
        department: ''
    });
    const [attachment, setAttachment] = useState(null);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getDepartments();
                setDepartments(response.data.departments);
                console.log('Departments fetched: ', response.data.departments);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
            
             await createDaily({...formData, attachment: attachment});
            
            toast.success('Task added successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });

            setFormData({
                reportTitle: '',
                selectDate: '',
                description: '',
                link: '',
                department: ''
            });
            setAttachment(null);

            setTimeout(() => {
                navigate('/daily-tasks');
            }, 2000);

        } catch (error) {
            toast.error('Error creating daily report!', {
                position: 'top-right',
                autoClose: 3000,
            });
            console.error('Error creating daily report:', error);
        }
        
    };
console.log(formData);
    return (
        <div className="vacation-dashboard-container">
            <Sidebar />
            <div className='main-form-container'>
                <div className="form-container">
                  
                    <form className="task-report-form" onSubmit={handleSubmit}>
                        <label htmlFor="reportTitle">საკითხის სახელწოდება</label>
                        <input
                            type="text"
                            id="reportTitle"
                            name="reportTitle"
                            placeholder="საკითხის სახელწოდება"
                            value={formData.reportTitle}
                            onChange={handleChange}
                        />

                        <label htmlFor="selectDate">აირჩიეთ თარიღი</label>
                        <input
                            type="date"
                            id="selectDate"
                            name="selectDate"
                            value={formData.selectDate}
                            readOnly
                        />

                        <label htmlFor="description">აღწერა</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="დაწერეთ თქვენი აღწერა..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                      
                      <label htmlFor="department">დეპარტამენტის მიბმა</label>
                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        >
                            <option value="" disabled>აირჩიეთ დეპარტამენტი</option>
                            {departments.map(department => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="link">ბმული</label>
                        <input
                            type="url"
                            id="link"
                            name="link"
                            placeholder="ჩაწერეთ ბმული..."
                            value={formData.link}
                            onChange={handleChange}
                        />



                        <label htmlFor="attachment">ფაილი</label>
                        <input
                            type="file"
                            id="attachment"
                            name="attachment"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />

                        <div className='button-container'>
                            
                        <Button
  variant="contained"
  color="primary"
  sx={{
    fontFamily: '"BPG Rioni", sans-serif',
    marginTop: '15px',
    marginBottom: '15px',
  }}
  type="submit"
>
  რეპორტის დამატება
</Button>
    </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default DailyTaskReportPage;
