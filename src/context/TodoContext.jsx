import {useTodos} from "../hooks/useTodos.js";
import {createContext, useContext, useMemo, useState} from "react";

export const TodoContext = createContext();

export const TodoProvider = ({children}) => {

    const {
        todos,
        reload,
        addTodo,
        deleteTodo,
        updateTodo,
        setTodos
    } = useTodos()

    const handleToggleDone =  async (id, next) => {
        await updateTodo(id, { done: next });
        reload()
    };

    const handleChangeTitle = async (id, itemTitle) => {
        await updateTodo(id, { title: itemTitle });
        reload();
    }

    const value= useMemo(
        () => ({
            todos,
            reload,
            setTodos,
            addTodo,
            deleteTodo,
            updateTodo,
            handleToggleDone,
            handleChangeTitle,
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