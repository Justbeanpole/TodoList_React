import {GripVertical, Ellipsis, ListOrdered, Pencil, Trash, Repeat2, Calendar as CalendarIcon, ChevronsRight} from 'lucide-react';
import {Fragment, useEffect, useRef, useState} from "react";
import Dropdown from "../ui/Dropdown.jsx";
import PopupCalendar from "../calendar/PopupCalendar.jsx";
import useClosePopup from "../../hooks/useClosePopup.jsx";


const TodoItem = ({todo, deleteTodo, updateTodo, className, handleChangeTitle, handleToggleDone}) => {
    const {id, title, done, date, repeat_rule, priority} = todo;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [itemTitle, setItemTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(false);

    const toggleMenu = useRef(null);
    const toggleCalendar = useRef(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setItemTitle(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            handleChangeTitle(id, itemTitle);
            updateTodo(id, {title:itemTitle});
        }
    };

    const closeMenu = (event) => {
        if (toggleMenu.current && !toggleMenu.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    const closeCalendar = (event) => {
        if (toggleCalendar.current && !toggleCalendar.current.contains(event.target)) {
            setShowCalendar(false);
        }
    };

    useClosePopup(closeMenu);
    useClosePopup(closeCalendar);
    useEffect(() => { setItemTitle(todo.title); }, [todo.title]);

    const handleClickTile = (selectedDate)=>{
        const itemDate = new Date(selectedDate);
        setShowCalendar(false);
        if (itemDate === new Date(date)) {
            setSelectedDate(selectedDate)
            updateTodo(id, {date:selectedDate.toISOString()});
            setSelectedDate(null)
        }
    }

    const formatDate = (date) => {
        const tempDate = new Date(date);
        const yy = String(tempDate.getFullYear()).slice(2);
        const mm = String(tempDate.getMonth() + 1).padStart(2, '0');
        const dd = String(tempDate.getDate()).padStart(2, '0');
        return `${yy}/${mm}/${dd}`;
    }


    return (
        <div className={["flex justify-between items-center bg-white group border rounded-2xl p-2 border-gray-300", todo.done?"shadow-none" : "shadow", className].join(" ")}>
            <div className="flex items-center">
                <input type="checkbox"
                       className="appearance-none border-2 cursor-pointer border-gray-300 size-5 rounded-full m-2 checked:bg-[url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBMaWNlbnNlOiBQRC4gTWFkZSBieSBNYXJ5IEFrdmVvOiBodHRwczovL21hcnlha3Zlby5jb20vIC0tPgo8c3ZnIGZpbGw9IiMwMDAwMDAiIHdpZHRoPSIxNXB4IiBoZWlnaHQ9IjE1cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgaWQ9ImNoZWNrIiBkYXRhLW5hbWU9IkxpbmUgQ29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9Imljb24gbGluZS1jb2xvciI+PHBvbHlsaW5lIGlkPSJwcmltYXJ5IiBwb2ludHM9IjUgMTIgMTAgMTcgMTkgOCIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogd2hpdGU7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDsgc3Ryb2tlLXdpZHRoOiAzOyI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-center checked:bg-gray-300"
                       onChange={(e) => handleToggleDone(todo.id, e.currentTarget.checked)}
                       checked={todo.done}
                />
                <div className="ml-2">
                    {isEditing ? (
                        <input
                            className="text-base font-medium text-gray-800"
                            value={itemTitle}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <div className={["text-sm font-medium text-gray-800", todo.done ? "line-through text-gray-400" : ""].join(" ")}>
                            {itemTitle}
                        </div>
                    )}
                    <div className="text-sm text-gray-500 flex items-center relative">
                        <span
                            className="flex items-center text-red-400">
                            {selectedDate && (<><CalendarIcon size={17}
                                                              className="inline-block mr-3"></CalendarIcon>{String(formatDate(date))}</>)}
                        </span>
                        <span className="flex items-center">
                        {repeat_rule && <Repeat2 size={14} className={`inline ${
                            repeat_rule === "daily"
                                ? "text-green-400"
                                : repeat_rule === "weekly"
                                    ? "text-blue-400"
                                    : repeat_rule === "monthly"
                                        ? "text-red-400"
                                        : ""
                        }`}/>}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 relative">
                <button className="rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 cursor-pointer p-1"
                        onClick={() => setShowDropdown((prev) => !prev)}><Ellipsis size={20}/></button>
                {showDropdown && (
                    <Dropdown
                        id={id}
                        toggleMenu={toggleMenu}
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        showCalendar={showCalendar}
                        setShowCalendar={setShowCalendar}
                        handleEditClick={handleEditClick}
                        deleteTodo={deleteTodo}
                    ></Dropdown>
                )}
                {showCalendar && (
                    <PopupCalendar
                        id={id}
                        toggleCalendar={toggleCalendar}
                        handleClickTile={handleClickTile}
                        updateTodo={updateTodo}
                        setShowCalendar={setShowCalendar}
                    ></PopupCalendar>
                )}
            </div>
        </div>
    )
}
export default TodoItem
