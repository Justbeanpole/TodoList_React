import TodoItem from "../components/TodoItem.jsx";
import {useState} from "react";

const MainPage = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAddTodo = () => {
        const newItem = {title : todoTitle}
        const newTodos = [...todos, newItem];
        setTodos(newTodos);
        setTodoTitle('');
    }

    const handleCreateItem = () => {

    }

    return (
        <>
            <h1>오늘은 8월 4일 월요일입니다</h1>
            <div className="todo-form">
                <input
                    type="text"
                    placeholder="생각나는 모든 것을 적어주세요"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                />
                <button onClick={addTodo}>추가</button>
            </div>
            <div className="itemList">
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
            </div>
            <button onClick={console.log(todos)}>다음</button>
        </>
    );
}

export default MainPage