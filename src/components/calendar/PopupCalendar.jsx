import React, {useState, useEffect, useRef} from 'react';
import Calendar from 'react-calendar';
import './PopupCalendar.css';
import moment from "moment";
import {Repeat2} from "lucide-react";
import RepeatOption from "../ui/RepeatOption.jsx";


const PopupCalendar = ({toggleCalendar, handleClickTile, updateTodo, id, setShowCalendar}) => {
    const [value, setValue] = useState(new Date());
    const [showRepeatOption, setShowRepeatOption] = useState(false);

    return (
        <div className="absolute top-0 z-20 rc--popup border rounded-md border-calender-border" ref={toggleCalendar}>
            <Calendar
                className="rounded-md"
                onChange={setValue}
                value={value}
                formatDay={(locale, date) => moment(date).format("DD")}
                showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                calendarType="gregory"
                onClickDay={handleClickTile}
                next2Label={null}
                prev2Label={null}
            />
            <div className="flex justify-center bg-white border border-t-calender-border rounded-b-md">
                <button
                    onClick={() => setShowRepeatOption((prev) => !prev)}
                    className="flex gap-1 items-center p-1">
                    <Repeat2 size={20}></Repeat2>
                    반복
                </button>
                {showRepeatOption && (
                    <RepeatOption
                        id={id}
                        setShowRepeatOption={setShowRepeatOption}
                        updateTodo={updateTodo}
                        setShowCalendar={setShowCalendar}
                    ></RepeatOption>
                )}
            </div>
        </div>
    );
};

export default PopupCalendar;
