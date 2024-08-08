import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import './index.css';
import { getNearestEvents } from '../../services/calendar';

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        fetchEvents();
    }, [currentDate]);

    const fetchEvents = async () => {
        try {
            const response = await getNearestEvents()
            // setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const renderEvents = (date) => {
        return events
            ?.filter(event => new Date(event.date).toDateString() === date.toDateString())
            .map(event => (
                <div key={event.id} className="event">
                    <div className={`event-priority-${event.priority}`}>{event.title}</div>
                </div>
            ));
    };

    const generateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);
        let days = [];

        for (let day = new Date(startOfMonth); day <= endOfMonth; day.setDate(day.getDate() + 1)) {
            days.push(new Date(day));
        }

        return days;
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="vacation-dashboard-container">
            <Sidebar />
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={previousMonth}>{'<'}</button>
                    <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                    <button onClick={nextMonth}>{'>'}</button>
                </div>
                <div className="calendar-grid">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <div key={index} className="calendar-day-name">{day}</div>
                    ))}
                    {generateCalendar().map((date, index) => (
                        <div key={index} className="calendar-day">
                            <div className="date">{date.getDate()}</div>
                            <div className="events">{renderEvents(date)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
