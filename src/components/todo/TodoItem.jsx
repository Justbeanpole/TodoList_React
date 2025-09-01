import {Pencil, Trash,} from 'lucide-react';
import {useState} from "react";

const TodoItem = ({todo, deleteTodo, className, handleToggleDone, handleChangeTitle}) => {
    const {id, title, done} = todo;
    const [itemTitle, setItemTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(false);

    //title 동적 변경
    const onChange = (e) => {
        setItemTitle(e.target.value);
    };
    //Enter를 눌렀을 때, 수정된 내용 저장
    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            handleChangeTitle(id, itemTitle);
        }
    };


    return (
        <div
            className={["flex items-center justify-between bg-white group border rounded-2xl p-2 border-gray-300", done ? "shadow-none" : "shadow", className].join(" ")}
        >
                <input type="checkbox"
                       className="appearance-none border-2 cursor-pointer border-gray-300 min-w-5 min-h-5 rounded-full m-2 checked:bg-[url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBMaWNlbnNlOiBQRC4gTWFkZSBieSBNYXJ5IEFrdmVvOiBodHRwczovL21hcnlha3Zlby5jb20vIC0tPgo8c3ZnIGZpbGw9IiMwMDAwMDAiIHdpZHRoPSIxNXB4IiBoZWlnaHQ9IjE1cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgaWQ9ImNoZWNrIiBkYXRhLW5hbWU9IkxpbmUgQ29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9Imljb24gbGluZS1jb2xvciI+PHBvbHlsaW5lIGlkPSJwcmltYXJ5IiBwb2ludHM9IjUgMTIgMTAgMTcgMTkgOCIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogd2hpdGU7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDsgc3Ryb2tlLXdpZHRoOiAzOyI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-center checked:bg-gray-300"
                       onChange={(e) => handleToggleDone(id, e.currentTarget.checked)}
                       checked={done}
                />
                <div className="ml-2 flex-grow min-w-0">
                    {isEditing ? (
                        <input
                            className="text-sm font-medium border-gray-300 border-2 rounded-md text-gray-800 w-full outline-0"
                            value={itemTitle}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                        />
                    ) : (
                        <div
                            className={["text-sm font-medium overflow-hidden text-ellipsis text-nowrap", done ? "line-through text-gray-400" : ""].join(" ")}>
                            {itemTitle}
                        </div>
                    )}
                </div>
                <div className="flex ml-3">
                    <button className="rounded-full text-gray-400 hover:bg-gray-200 opacity-0 group-hover:opacity-100 cursor-pointer p-1"
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsEditing(prev => !prev);
                            }}><Pencil size={20}/></button>
                    <button className="rounded-full text-gray-400 hover:bg-gray-200 opacity-0 group-hover:opacity-100 cursor-pointer p-1"
                            onClick={() => deleteTodo(id)}><Trash size={20}/></button>
                </div>
        </div>
    )
}
export default TodoItem
