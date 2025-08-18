import {Sun, CalendarClock, Clock7, Trash} from "lucide-react";

const RepeatOption = ({setShowRepeatOption, updateTodo, id, setShowCalendar}) => {
    return (
        <div className="absolute bottom-0 right-0">
            <ul className="py-2 text-1xl text-gray-700 bg-white rounded-md border shadow-lg">
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer gap-2"
                    onClick={()=> {
                        setShowRepeatOption(false)
                        setShowCalendar(false)
                        updateTodo(id, {repeat_rule:"daily"})
                    }}
                >
                    <Sun size={15}/>매일
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer gap-2"
                    onClick={()=> {
                        setShowRepeatOption(false)
                        setShowCalendar(false)
                        updateTodo(id, {repeat_rule:"weekly"})
                    }}
                >
                    <Clock7 size={15}/>매주
                </li>
                <li className="flex items-center px-4 py-2  hover:bg-gray-200 cursor-pointer gap-2"
                    onClick={()=> {
                        setShowRepeatOption(false)
                        setShowCalendar(false)
                        updateTodo(id, {repeat_rule:"monthly"})
                    }}
                >
                    <CalendarClock size={15}/>매달
                </li>
                <li className="flex items-center px-4 py-2 text-red-500 hover:bg-gray-200 cursor-pointer gap-2"
                    onClick={()=> {
                        setShowRepeatOption(false)
                        setShowCalendar(false)
                        updateTodo(id, {repeat_rule:null})
                    }}
                >
                    <Trash size={15}/>삭제
                </li>
            </ul>
        </div>
    )
}

export default RepeatOption