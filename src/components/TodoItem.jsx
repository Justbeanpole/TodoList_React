const TodoItem = () => {
    return (
        <div className="items">
            <input type="checkbox"/>
            <span className = "title">item 1</span>
            <button>🔁</button>
            <button>수정</button>
            <button>삭제</button>
            <button>우선순위 변경</button>
        </div>
    )
}
export default TodoItem