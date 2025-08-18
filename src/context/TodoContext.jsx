import {useTodos} from "../hooks/useTodos.js";
import {createContext, useContext, useMemo} from "react";

export const TodoContext = createContext();

export const TodoProvider = ({children}) => {
    const {
        todos,
        reload,
        addTodo,
        deleteTodo,
        updateTodo,
        setTodos
    } = useTodos({orderBy: "list_order"})

    const handleToggleDone =  async (id, next) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, done: next } : t));
        await updateTodo(id, { done: next });
    };

    const value= useMemo(
        () => ({
            todos,
            reload,
            addTodo,
            deleteTodo,
            updateTodo,
            handleToggleDone,
        }),
        [todos, reload, addTodo, deleteTodo, updateTodo]
    );

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodoContext = () => useContext(TodoContext);