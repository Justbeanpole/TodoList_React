import TodoItem from "../components/TodoItem.jsx";

const ListPage = () => {
    return (
        <>
            <div>
                <h1>Goal Tracker</h1>
                <div>상태</div>
            </div>
            <div>
                <div className="todo-form">
                    <input
                        type="text"
                        placeholder="Todo 추가하기"
                    />
                    <button>추가</button>
                </div>
                <div className = "itemHeader">
                    <button>정렬</button>
                    <button>필터</button>
                </div>
                <div className="itemBox">
                    <TodoItem></TodoItem>
                    <TodoItem></TodoItem>
                    <TodoItem></TodoItem>
                    <TodoItem></TodoItem>
                </div>
            </div>
        </>
    )
}

export default ListPage;