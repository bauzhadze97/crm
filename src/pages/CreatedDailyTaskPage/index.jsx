import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/Sidebar";
import DeleteIcon from '../../assets/images/delete.png';
import EditIcon from '../../assets/images/edit.png';
import VisibilityIcon from '../../assets/images/visibility.png';
import './index.css';
import { getDailyList } from '../../services/daily';
import { Link } from 'react-router-dom';

const CreatedDailyTaskPage = () => {
    const [dailies, setDailies] = useState([]);

    useEffect(() => {
        const fetchDailies = async () => {
            try {
                const response = await getDailyList();
                setDailies(response.data.data); 
            } catch (error) {
                console.error('Error fetching dailies:', error);
            }
        };

        fetchDailies();
    }, []);

    return (
        <div className="vacation-dashboard-container">
            <Sidebar />
            <div className='main-form-container'>
                <div className="table-container">
                    <h2 className="page-name">All Daily Task Report</h2>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Daily Task Name</th>
                                <th>Department</th>
                                <th>Name/Surname</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dailies.length > 0 ? (
                                dailies.map((daily) => (
                                    <tr key={daily.id}>
                                        <td>{new Date(daily.date).toLocaleDateString()}</td>
                                        <td>{daily.name}</td>
                                        <td>{daily.user?.department?.name || 'No Department'}</td>
                                        <td>{daily.user?.name || 'No User'}</td>
                                        <td>{daily.description}</td>
                                        <td>
                                            <div className="flex justify-center">
                                                <a href={`/dailies/${daily.id}`}><img src={VisibilityIcon} alt="View" className="action-icon" /></a>
                                                <Link to={`/make-comment/${daily.id}`}><img src={EditIcon} alt="Edit" className="action-icon" /></Link>
                                                <button onClick={() => handleDelete(daily.id)}><img src={DeleteIcon} alt="Delete" className="action-icon" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No Daily Task Reports found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button>&lt;</button>
                        <span>1 of 3</span>
                        <button>&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatedDailyTaskPage;
