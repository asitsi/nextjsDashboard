"use client"
import React, { useState } from 'react';
import "../../styles/Calendar.css"
import "../../styles/Popup.css";
import Popup from '@/app/components/Popup';
import { Event } from '@/app/directory/interface';

interface CalendarProps { }

const Calendar: React.FC<CalendarProps> = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [clickDay, setClickDay] = useState<number | undefined>();
    const [events, setEvents] = useState<Event[]>([]);
    const [eventCreateDay, setEventCreateDay] = useState<number | undefined>();
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [inputTitle, setInputTitle] = useState('');
    const [inputType, setInputType] = useState<'event' | 'reminder'>('event');

    const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (year: number, month: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const generateCalendar = (): object[][] => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const weeks: object[][] = [];

        let dayCount = 1;
        let nextMonthDayCount = 1;

        for (let i = 0; i < 6; i++) {
            const days: object[] = [];

            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDayOfMonth) || dayCount > daysInMonth) {
                    const daysInPrevMonth = getDaysInMonth(year, month - 1);
                    const prevMonthDays = daysInPrevMonth - firstDayOfMonth + j + 1;

                    days.push(dayCount > daysInMonth ? {day:nextMonthDayCount , type: 'nextMonth'} : prevMonthDays > 0 ? {day:prevMonthDays, type: 'prevMonthDays'} : {});
                    { dayCount > daysInMonth ? nextMonthDayCount++ : null }
                } else {
                    days.push({day:dayCount});
                    dayCount++;
                }
            }

            weeks.push(days);
        }

        return weeks;
    };

    const handlePrevMonth = (): void => {
        setSelectedDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = (): void => {
        setSelectedDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day: number): void => {
        setClickDay(day);
        setPopupVisibility(true);
        setEventCreateDay(day)
    };

    const handleAddEvent = (day: number | undefined): void => {
        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).getTime();
        if (selectedDate && inputTitle) {
            const newEvent: Event = {
                id: `${selectedDate.toISOString()}-${inputTitle}`,
                title: inputTitle,
                type: inputType,
                date: date
            };

            setEvents([...events, newEvent]);
            setInputTitle('');
            setInputType('event');
            setPopupVisibility(false);
        }
    };

    const handleClosePopup = () => {
        setPopupVisibility(false);
    };

    console.log()

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>&lt;</button>
                <h2>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days-of-week">
                {daysOfWeek.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>
            <div className="calendar-grid">
                {generateCalendar().map((week, weekIndex) => (
                    <div key={weekIndex} className="week">
                        {week.map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                className={`day ${day?.type ? 'disabled' : ''}`}
                                onClick={() => handleDayClick(day?.day)}
                            >
                                <span>{day?.day}</span>
                                {day?.type ? null : events
                                    .filter(
                                        (event) =>
                                            event.date ===
                                            new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day?.day).getTime()
                                    )
                                    .map((event, index) => (
                                        <div key={index} className={`event ${event.type}`} title={event.title}>
                                            {event.title}
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {isPopupVisible && (
                <Popup onClose={handleClosePopup}>
                    <div className="event-options">
                        <label>
                            Title:
                            <input
                                type="text"
                                placeholder="Event title"
                                value={inputTitle}
                                onChange={(e) => setInputTitle(e.target.value)}
                                className='formInput'
                            />
                        </label>
                        <br />
                        <label>
                            Type:
                            <select
                                value={inputType}
                                onChange={(e) => setInputType(e.target.value as 'event' | 'reminder')}
                                className='formInput'
                            >
                                <option value="event">Event</option>
                                <option value="reminder">Reminder</option>
                            </select>
                        </label>
                        <br />
                        <button onClick={() => handleAddEvent(eventCreateDay)} style={{ backgroundColor: '#38CC77', border: 'none', outline: 'none', padding: '12px 2rem', borderRadius: '20px', color: '#ffffff', fontWeight: 'bold' }}>Add</button>
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default Calendar;
