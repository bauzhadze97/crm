import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/Sidebar';
import './index.css';
import { createDaily } from '../../services/daily';
import { forgotPassword, getDepartments } from '../../services/auth';

const DailyTaskReportPage = () => {
    const [formData, setFormData] = useState({
        reportTitle: '',
        selectDate: '',
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
            
             await createDaily(formData);
            
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
                    <h2 className='page-name'>Daily Task Report</h2>
                    <form className="task-report-form" onSubmit={handleSubmit}>
                        <label htmlFor="reportTitle">Daily Task Report</label>
                        <input
                            type="text"
                            id="reportTitle"
                            name="reportTitle"
                            placeholder="Daily Task Report - IT Department"
                            value={formData.reportTitle}
                            onChange={handleChange}
                        />

                        <label htmlFor="selectDate">Select Date</label>
                        <input
                            type="date"
                            id="selectDate"
                            name="selectDate"
                            value={formData.selectDate}
                            onChange={handleChange}
                        />

                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter your description here..."
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <label htmlFor="link">Link</label>
                        <input
                            type="url"
                            id="link"
                            name="link"
                            placeholder="Enter the link here..."
                            value={formData.link}
                            onChange={handleChange}
                        />

                        <label htmlFor="department">Assign to Department</label>
                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select a department</option>
                            {departments.map(department => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="attachment">Attachment</label>
                        <input
                            type="file"
                            id="attachment"
                            name="attachment"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />

                        <div className='button-container'>
                            <button type="submit">+ Add Task</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default DailyTaskReportPage;
