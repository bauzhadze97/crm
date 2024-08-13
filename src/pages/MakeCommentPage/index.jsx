import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/Sidebar';
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
                        <label htmlFor="department">აირჩიე დეპარტამენტი</label>
                        <select
                            id="department"
                            name="department"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                        >
                            <option value="" disabled>Select a department</option>
                            {departments && departments.map(department => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                        <div className='button-container'>
                            <button type="submit">+ {id ? 'Update' : 'Add'} Comment</button>
                        </div>
                    </form>
                </div>
                <div className='form-container1'>
                    {daily && daily.comments && (
                        <div className="comments-section">
                            <h3>კომენტარები ({daily.comments.length})</h3> {/* Display comment count */}
                            <div className="comments-list">
                                {daily.comments.map(comment => (
                                    <div key={comment.id} className="comment-card">
                                        <div className="comment-header">
                                            <strong>{comment.user.name}</strong>
                                            <span>{new Date(comment.created_at).toLocaleString()}</span>
                                        </div>
                                        <p className="comment-text">{comment?.comment}</p>
                                        <span className="comment-department">{comment?.department?.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MakeCommentPage;
