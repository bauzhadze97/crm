import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/Sidebar";
import './index.css';
import { getDailyList } from '../../services/daily';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';

const CreatedDailyTaskPage = () => {
    const [dailies, setDailies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchDailies = async () => {
            try {
                const response = await getDailyList(currentPage, itemsPerPage);
                const sortedData = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setDailies(sortedData);
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error('Error fetching dailies:', error);
            }
        };

        fetchDailies();
    }, [currentPage, itemsPerPage]);

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

    const getRowStyle = (daily) => {
        if (daily.comments.length === 0) {
            return { backgroundColor: '#800020', color: 'white' };
        }
        const hasAdminComment = daily.comments.some(comment => comment.user.id === 1);
        if (hasAdminComment) {
            return { backgroundColor: '#00CB08' };
        }
        return {};
    };

    return (
        <div className="vacation-dashboard-container">
            <Sidebar />
            <div className='main-form-container'>
                <div className="table-container">
                    <h2 className="page-name">All Daily Task Report</h2>
                    <div className="pagination-controls">
                        <label htmlFor="itemsPerPage">Items per page: </label>
                        <Select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={40}>40</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </div>
                    <Table className="custom-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ticket ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Daily Task Name</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Name/Surname</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dailies.length > 0 ? (
                                dailies.map((daily) => (
                                    <TableRow key={daily.id} style={getRowStyle(daily)}>
                                        <TableCell>{daily.id}</TableCell>
                                        <TableCell>{new Date(daily.date).toLocaleDateString()}</TableCell>
                                        <TableCell><Link to={`/make-comment/${daily.id}`}>{daily.name}</Link></TableCell>
                                        <TableCell>{daily.user?.department?.name || 'No Department'}</TableCell>
                                        <TableCell>{daily.user?.name || 'No User' }/ {daily.user?.sur_name}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5}>No Daily Task Reports found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="pagination">
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</Button>
                        <span>{currentPage} of {totalPages}</span>
                        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>&gt;</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatedDailyTaskPage;
