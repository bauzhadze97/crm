import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/Sidebar";
import './index.css';
import { getDailyList } from '../../services/daily';
import { getDepartments } from '../../services/auth';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem, TextField, Grid, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';

const CreatedDailyTaskPage = () => {
    const [dailies, setDailies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filters, setFilters] = useState({
        date: '',
        taskName: '',
        department: '',
        adminNotCommented: false
    });
    const [departments, setDepartments] = useState([]);

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

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getDepartments();
                setDepartments(response.data.departments);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

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

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters({
            ...filters,
            [name]: type === 'checkbox' ? checked : value
        });
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

    const filteredDailies = dailies.filter(daily => {
        const adminHasNotCommented = filters.adminNotCommented ? !daily.comments.some(comment => comment.user.id === 1) : true;
        return (
            (filters.date === '' || new Date(daily.date).toLocaleDateString() === new Date(filters.date).toLocaleDateString()) &&
            (filters.taskName === '' || daily.name.toLowerCase().includes(filters.taskName.toLowerCase())) &&
            (filters.department === '' || daily.user?.department?.id === filters.department) &&
            adminHasNotCommented
        );
    });

    return (
        <div className="vacation-dashboard-container">
            <Sidebar />
            <div className='main-form-container'>
                <div className="table-container">
                    <h2 className="page-name">
                        <div>დღის საკითხების დაფა</div>
                        <div className='button-container'>
                            <Link to='/create-daily'><Button variant="contained" color="primary">საკითხის გამოტანა</Button></Link>
                        </div>
                    </h2>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                fullWidth
                                label="ფილტრი თარიღის მიხედვით"
                                type="date"
                                name="date"
                                value={filters.date}
                                onChange={handleFilterChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="ფილტრი სახელწოდებით"
                                name="taskName"
                                value={filters.taskName}
                                onChange={handleFilterChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>ფილტრი დეპარტამენტების მიხედვით</InputLabel>
                                <Select
                                    name="department"
                                    value={filters.department}
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="">ყველა დეპარტამენტი</MenuItem>
                                    {departments.map(department => (
                                        <MenuItem key={department.id} value={department.id}>
                                            {department.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <FormControl fullWidth>
                                
                                <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                    <MenuItem value={40}>40</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filters.adminNotCommented}
                                        onChange={handleFilterChange}
                                        name="adminNotCommented"
                                        color="primary"
                                    />
                                }
                                label="ხელმძღვანელის კომენტარი"
                            />
                        </Grid>
                    </Grid>
                    <Table className="custom-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>საკითხის ნომერი</TableCell>
                                <TableCell>თარიღი</TableCell>
                                <TableCell>საკითხი</TableCell>
                                <TableCell>დეპარტამენტი</TableCell>
                                <TableCell>სახელი გვარი</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredDailies.length > 0 ? (
                                filteredDailies.map((daily) => (
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
