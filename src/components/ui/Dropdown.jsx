import {Calendar, Pencil, Trash} from "lucide-react";

const Dropdown = ({id, toggleMenu, showCalendar, setShowCalendar, setShowDropdown, showDropdown, deleteTodo, handleEditClick}) => {
    return (
        <div
            className="absolute right-0 top-0 w-56 opacity-100 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
            ref={toggleMenu}>
            <ul className="py-2 text-sm text-gray-700">
                <li className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer gap-2"
                    onClick={() => {
                        setShowDropdown(prev => !prev)
                        handleEditClick(true)
                    }}>
                    <Pencil size={16}/> 수정
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer gap-2"
                    onClick={() => {
                        setShowDropdown(prev => !prev);
                        setShowCalendar(!showCalendar)
                    }}>
                    <Calendar size={16}/> 날짜
                </li>
                <li className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer gap-2"
                    onClick={() => {
                        setShowDropdown(prev => !prev)
                        deleteTodo(id)
                    }}>
                    <Trash size={16}/> 삭제
                </li>
            </ul>
        </div>
    )
}

export default Dropdown;