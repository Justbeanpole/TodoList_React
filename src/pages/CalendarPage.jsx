import React, {useState} from "react";
import HabitTracker from "../components/ui/HabitTracker.jsx";
import Calendar from "../components/calendar/MainCalendar.jsx";

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());

    const goToToday = () => {
        setDate(new Date());
    };

    // Placeholder for events
    const events = {
        '2025-08-12': [{ id: 1, title: 'Meeting with team' }],
        '2025-08-15': [{ id: 2, title: 'Project deadline' }],
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().slice(0, 10);
            const dayEvents = events[dateString];
            if (dayEvents) {
                return (
                    <div className="event-block">
                        {dayEvents.map(event => (
                            <div key={event.id} className="event-item">{event.title}</div>
                        ))}
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* 왼쪽 컬럼: 습관 트래커 */}
            <div className="w-full lg:w-1/3 flex flex-col gap-5">
                <HabitTracker />
                <HabitTracker />
            </div>
            {/* 오른쪽 컬럼: 달력 */}
            <Calendar
                date={date}
                setDate={setDate}
                goToToday={goToToday}
                tileContent={tileContent}
            ></Calendar>
        </div>
    );
};

export default CalendarPage;