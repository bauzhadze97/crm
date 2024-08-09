import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './index.css';
import { createDailyComment } from '../../services/dailyComment';
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
            setDaily((prevDaily) => ({
                ...prevDaily,
                comments: [...prevDaily.comments, response.data]
            }));
        } catch (error) {
            console.error('Error submitting the comment:', error);
        }
    };

    return (
        <div className="vacation-dashboard-container">
            <Sidebar />
            <div className='main-form-container'>
                <div className="form-container">
                    <h2 className='page-name'>დღის საკითხი</h2>
                    <form className="task-report-form" onSubmit={handleSubmit}>
                        {daily && daily.description ? (
                            <textarea
                                disabled
                                id="dailyDescription"
                                name="dailyDescription"
                                value={daily.description}
                            />
                        ) : (
                            <p>Loading daily description...</p>
                        )}
                        <label htmlFor="comment">კომენტარი</label>
                        <textarea
                            id="comment"
                            name="comment"
                            placeholder="დაწერეთ კომენტარი..."
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
                            <option value="" disabled>აირჩიე დეპარტამენტი</option>
                            {departments && departments.map(department => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                        <div className='button-container'>
                            <button type="submit">+ {id ? 'დამატება' : 'Add'} </button>
                        </div>
                    </form>
                    {daily && daily.comments && daily.comments.length > 0 && (
                        <div className="comments-section">
                            <h3>Comments</h3>
                            <div className="comments-list">
                                {daily.comments.map(comment => (
                                    <div key={comment.id} className="comment-card">
                                        <div className="comment-header">
                                            <strong>{comment.user.name}</strong>
                                            <span>{new Date(comment.created_at).toLocaleString()}</span>
                                        </div>
                                        <p className="comment-text">{comment.comment}</p>
                                        <span className="comment-department">
                                            {comment.department ? comment.department.name : 'No Department'}
                                        </span>
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
