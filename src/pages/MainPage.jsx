import {useEffect, useState} from "react";
import AddTodo from "../components/ui/AddTodo.jsx";
import DateHeader from "../components/ui/DateHeader.jsx";
import TodoItem from "../components/todo/TodoItem.jsx";
import {useTodoContext} from "../context/TodoContext.jsx";

const MainPage = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const {todos, reload, addTodo, deleteTodo, updateTodo, handleToggleDone} = useTodoContext();

    return (
        <div className="flex flex-col items-center h-full justify-center">
            <DateHeader></DateHeader>
            <div className="content w-full max-w-2xl">
                <AddTodo
                    todoTitle={todoTitle}
                    setTodoTitle={setTodoTitle}
                    addTodo={addTodo}
                ></AddTodo>
                <ul className="w-3/4 justify-self-center mt-8 bg-white border-gray-300 pb-1 mb-3 flex flex-col gap-2">
                    {todos.map((todo)=>
                        (
                        <TodoItem
                            todo={todo}
                            key={todo.id}
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo}
                            handleToggleDone={handleToggleDone}
                        ></TodoItem>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MainPage
