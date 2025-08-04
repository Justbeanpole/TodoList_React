import TodoItem from "../components/TodoItem.jsx";

const SetPriorityPage = () => {
    return (
        <>
            <div className="todoList">
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
            </div>
            <div className="prioritySection" style={{width : "120px", height : "120px",display : "grid", gridTemplateColumns : "1fr 1fr", border:"1px solid yellow"}}>
                <div className="section" style={{border : "1px solid white"}}></div>
                <div className="section" style={{border : "1px solid white"}}></div>
                <div className="section" style={{border : "1px solid white"}}></div>
                <div className="section" style={{border : "1px solid white"}}></div>
            </div>
            <button>다음</button>
        </>
    )
}

export default SetPriorityPage