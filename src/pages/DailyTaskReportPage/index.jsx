import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './index.css';
import { createDaily } from '../../services/daily';

const DailyTaskReportPage = () => {
    const [formData, setFormData] = useState({
        reportTitle: '',
        selectDate: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: formData.reportTitle,
            date: formData.selectDate,
            description: formData.description,
        };

        try {
            // Call the createDaily function to create a new daily report
            const response = await createDaily(data);

            // Handle success (e.g., show a success message, redirect, etc.)
            console.log('Daily report created successfully:', response.data);

            // Clear the form fields after submission
            setFormData({
                reportTitle: '',
                selectDate: '',
                description: ''
            });

        } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error('Error creating daily report:', error);
        }
    };

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
                        <div className='button-container'>
                            <button type="submit">+ Add Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DailyTaskReportPage;
