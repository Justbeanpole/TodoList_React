import {useEffect, useState} from "react";
import AddTodo from "../components/ui/AddTodo.jsx";
import DateHeader from "../components/ui/DateHeader.jsx";
import TodoItem from "../components/todo/TodoItem.jsx";
import {useTodoContext} from "../context/TodoContext.jsx";

const MainPage = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const {todos, reload, addTodo, deleteTodo, updateTodo, handleToggleDone, handleChangeTitle} = useTodoContext();

    useEffect(() => {
        document.title = "Todo";
    },[])

    return (
        <div className="flex flex-col items-center h-screen">
            <div className="w-full max-w-2xl pt-52 flex flex-col">
            <DateHeader></DateHeader>
                <AddTodo
                    todoTitle={todoTitle}
                    setTodoTitle={setTodoTitle}
                    addTodo={addTodo}
                ></AddTodo>
                <div className="w-2/3 overflow-y-auto scrollbar-hide self-center">
                    <ul className="w-full mt-8 bg-white border-gray-300 pb-1 mb-3 flex flex-col gap-2">
                        {todos.map((todo)=>
                            (
                                <TodoItem
                                    todo={todo}
                                    key={todo.id}
                                    updateTodo={updateTodo}
                                    deleteTodo={deleteTodo}
                                    handleToggleDone={handleToggleDone}
                                    handleChangeTitle={handleChangeTitle}
                                ></TodoItem>
                            )
                        )}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default MainPage
