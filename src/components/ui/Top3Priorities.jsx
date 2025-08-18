import {Draggable, Droppable} from "react-beautiful-dnd";
import TodoItem from "../todo/TodoItem.jsx";


const Top3Priorities = ({todos, deleteTodo, updateTodo, handleChangeTitle, handleToggleDone}) => {
    const lanes = ["high", "medium", "low"];
    return (
        <div className="p-5 pb-0 flex flex-col">
            <h1 className="text-red-500 font-bold text-2xl mb-3">Top 3</h1>
            <div className="grid grid-rows-3 gap-2 border-b-2 pb-2">
                {lanes.map((lane, index) => (
                    <Droppable key={lane} droppableId={`top3-${lane}`}>
                        {(provided) => (
                            <div
                                className={"flex flex-col flex-nowrap justify-center min-h-16 hover:bg-gray-200 rounded-2xl relative"}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {todos
                                    .filter(todo => todo.priority === lane)
                                    .map((todo, index) => {
                                            return (
                                                <Draggable
                                                    key={todo.id}
                                                    draggableId={todo.id}
                                                    index={index}
                                                >
                                                    {(p) => (
                                                        <div ref={p.innerRef}
                                                             {...p.draggableProps}
                                                             {...p.dragHandleProps}
                                                        >
                                                            <TodoItem
                                                                todo={todo}
                                                                deleteTodo={deleteTodo}
                                                                updateTodo={updateTodo}
                                                                handleChangeTitle={handleChangeTitle}
                                                                handleToggleDone={handleToggleDone}
                                                            ></TodoItem>
                                                        </div>
                                                    )}
                                                </Draggable>)
                                        }
                                    )}
                                {/* 여기에 Draggable 아이템(이미 top3에 배치된 것들)이 들어옴 */}
                                <div className="absolute inset-0 pointer-events-none"
                                >{provided.placeholder}</div>

                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </div>
    )
}

export default Top3Priorities;