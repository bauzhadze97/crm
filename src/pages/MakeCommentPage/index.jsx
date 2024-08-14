import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/Sidebar';
import ReplyModal from '../../components/Modal/ReplyModal';
import { Button, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './index.css';
import { createDailyComment, getDailyComment, updateDailyComment } from '../../services/dailyComment';
import { getDepartments } from '../../services/auth';
import { getDaily } from '../../services/daily';

const MakeCommentPage = () => {
    const { id } = useParams();
    const [comment, setComment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [daily, setDaily] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchDaily = async () => {
                try {
                    const response = await getDaily(id);
                    console.log(response);
                    setDaily(response.data); 
                } catch (error) {
                    console.error('Error fetching the daily task:', error);
                }
            };

            fetchDaily();
        }
    }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            comment: comment,
            department_id: selectedDepartment,
            daily_id: id
        };

        try {
            const response = await createDailyComment(data);
            console.log(response);

            setDaily((prevDaily) => ({
                ...prevDaily,
                comments: [...prevDaily.comments, response.data]
            }));

            // Show success notification
            toast.success('Comment added successfully!');

            // Clear comment and department fields
            setComment('');
            setSelectedDepartment('');
        } catch (error) {
            console.error('Error submitting the comment:', error);
        }
    };

    const handleReply = (commentId) => {
        setReplyingTo(commentId);
        setOpenModal(true);
    };

    const handleSaveReply = async (parentCommentId, reply) => {
        const data = {
            comment: reply,
            department_id: selectedDepartment,
            daily_id: id,
            parent_id: parentCommentId
        };

        try {
            const response = await createDailyComment(data);
            console.log(response);

            setDaily((prevDaily) => ({
                ...prevDaily,
                comments: [...prevDaily.comments, response.data]
            }));

            // Show success notification
            toast.success('კომენტარი დამატებულია!');
            setOpenModal(false);
        } catch (error) {
            console.error('შეცდომა. კომენტარი არ დაემატა:', error);
        }
    };

    const renderComments = (comments, parentId = null) => {
        return comments
            .filter(comment => comment.parent_id === parentId)
            .map(comment => (
                <Card key={comment.id} className="comment-card">
                    <CardContent>
                        <Typography variant="subtitle1" style={comment.id === 1 ? { color: 'yellow' } : {}}><strong>{comment.user.name}</strong></Typography>
                        <Typography variant="body2" color="textSecondary">{new Date(comment.created_at).toLocaleString()}</Typography>
                        <Typography variant="body1" className="comment-text" style={comment.id === 1 ? { color: 'yellow' } : {}}>{comment.comment}</Typography>
                        <Typography variant="body2" color="textSecondary" className="comment-department">{comment.department?.name}</Typography>
                        <Button variant="outlined" size="small" onClick={() => handleReply(comment.id)}>Reply</Button>
                        <div className="replies">
                            {renderComments(comments, comment.id)}
                        </div>
                    </CardContent>
                </Card>
            ));
    };

    console.log(daily);

    return (
        <div className="vacation-dashboard-container">
            <Sidebar />
            <div className='main-form-container'>
                <ToastContainer />
                <div className="form-container">
                    {daily && (
                        <>
                            <h2 className='page-name'>{daily.name}</h2>
                            <form className="task-report-form">
                                <label htmlFor="description">სრული აღწერა</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    disabled
                                    value={daily.description}
                                />
                            </form>
                            {daily.attachment && (
                                <div className="attachment-section">
                                    <label>Attachment: </label>
                                    <a href={`${process.env.REACT_APP_API_URL}/storage/${daily.attachment}`} target="_blank" rel="noopener noreferrer" download>
                                        Download Attachment
                                    </a>
                                </div>
                            )}
                            {daily.link && (
                                <div className="link-section">
                                    <label>Link: </label>
                                    <a href={daily.link} target="_blank" rel="noopener noreferrer">{daily.link}</a>
                                </div>
                            )}
                        </>
                    )}
                    <form className="task-report-form" onSubmit={handleSubmit}>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                            id="comment"
                            name="comment"
                            placeholder="Enter your comment here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel className='selectdepartment' id="department-label">აირჩიე დეპარტამენტი</InputLabel>
                            <Select
                                labelId="department-label"
                                id="department"
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                            >
                                <MenuItem value="" disabled>Select a department</MenuItem>
                                {departments && departments.map(department => (
                                    <MenuItem key={department.id} value={department.id}>
                                        {department.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className='button-container'>
                            <Button variant="contained" color="primary" type="submit">დამატება</Button>
                        </div>
                    </form>
                </div>
                <div className='form-container1'>
                    {daily && daily.comments && (
                        <div className="comments-section">
                            <h3>კომენტარები ({daily.comments.length})</h3>
                            <div className="comments-list">
                                {renderComments(daily.comments)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ReplyModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
                handleSave={handleSaveReply}
                parentCommentId={replyingTo}
            />
        </div>
    );
};

export default MakeCommentPage;
