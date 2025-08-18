import {useEffect, useState} from "react";
import AddTodo from "../components/ui/AddTodo.jsx";
import DateHeader from "../components/ui/DateHeader.jsx";
import TodoItem from "../components/todo/TodoItem.jsx";
import {useTodoContext} from "../context/TodoContext.jsx";

const MainPage = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const {todos, reload, addTodo, deleteTodo, updateTodo, handleToggleDone, handleChangeTitle} = useTodoContext();

    return (
        <div className="flex flex-col items-center h-screen">
            <div className="w-full max-w-2xl shrink-0 pt-52 pb-4">
            <DateHeader></DateHeader>
                <AddTodo
                    todoTitle={todoTitle}
                    setTodoTitle={setTodoTitle}
                    addTodo={addTodo}
                ></AddTodo>
            </div>
            <div className="w-1/3 flex justify-center overflow-y-auto scrollbar-hide">
                <ul className="w-full justify-self-center mt-8 bg-white border-gray-300 pb-1 mb-3 flex flex-col gap-2 ">
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
    );
}

export default MainPage
