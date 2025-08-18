import {Plus} from "lucide-react";

const AddTodo = ({todoTitle, setTodoTitle, addTodo}) => {

    const onSubmit = (e) => {
        e.preventDefault();
        addTodo({title:todoTitle})
        setTodoTitle("");
    }

    return (
        <form className="flex p-2 bg-white rounded-full shadow-md border" onSubmit={onSubmit}>
            <div className="flex-grow mr-4">
                <input
                    className="w-full h-full rounded-md focus:border-pastel-green-accent focus:outline-none px-4"
                    type="text"
                    placeholder="생각나는 모든 것을 적어주세요"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                />
            </div>
            <div className="flex gap-5">
                <button className="bg-black text-white rounded-full p-1"
                ><Plus/></button>
            </div>
        </form>)
}

export default AddTodo;