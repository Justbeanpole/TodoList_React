import {useCallback, useEffect, useState} from "react";
import {getTodos} from "../components/api/todos.js";
import {superbase} from "../lib/superbase.js";

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const reload = useCallback(async () => {
        const data = await getTodos();
        setTodos(data ?? []);
    }, []);

    useEffect(() => {
        reload();
    }, [reload]);

    useEffect(() => {
        const channel = superbase
            .channel('todosChannel')
            .on('postgres_changes', {event: "*", schema: 'public', table: 'todos'},
                () => {reload()})
        .subscribe()
        return () => {superbase.removeChannel(channel);}
    }, [reload])

    const addTodo = async (payload) => {
        await superbase.from('todos').insert([payload]);
        await reload();
    };

    const updateTodo = async (id, patch) => {
        await superbase.from('todos').update(patch).eq('id', id);
        await reload();
    };

    const deleteTodo = async (id) => {
        await superbase.from('todos').delete().eq('id', id);
        await reload();
    };
    return { todos, reload, addTodo, updateTodo, deleteTodo, setTodos };
}