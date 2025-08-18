import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './MainCalendar.css';
import moment from 'moment';


const MainCalendar = ({date, setDate, goToToday, tileContent}) => {

  return (
      <div className="w-full lg:w-2/3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Schedule Calendar</h2>
            <button onClick={goToToday} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Today</button>
          </div>
          <Calendar
              onChange={setDate}
              value={date}
              className="w-full border-none rc--main"
              tileContent={tileContent}
              formatDay={(locale, date) => moment(date).format("DD")}
              showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
              calendarType="gregory"
              next2Label={null}
              prev2Label={null}
          />
        </div>
      </div>
  );
};

export default MainCalendar;