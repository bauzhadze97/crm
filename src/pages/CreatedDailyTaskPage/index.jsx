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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchDailies = async () => {
            try {
                const response = await getDailyList(currentPage, itemsPerPage);
                setDailies(response.data.data);
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error('Error fetching dailies:', error);
            }
        };

        fetchDailies();
    }, [currentPage, itemsPerPage]);

    const handleDelete = (id) => {
        // Implement the delete functionality
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to the first page when items per page changes
    };

    return (
        <div className="vacation-dashboard-container">
            <Sidebar />
            <div className='main-form-container'>
                <div className="table-container">
                    <h2 className="page-name">All Daily Task Report</h2>
                    <div className="pagination-controls">
                        <label htmlFor="itemsPerPage">Items per page: </label>
                        <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={40}>40</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
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
                                        <td><Link to={`/make-comment/${daily.id}`}>{daily.name}</Link></td>
                                        <td>{daily.user?.department?.name || 'No Department'}</td>
                                        <td>{daily.user?.name || 'No User' }/ {daily.user?.sur_name}</td>
                                        <td>{daily.user?.name || 'No Description'}</td>
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
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</button>
                        <span>{currentPage} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatedDailyTaskPage;
