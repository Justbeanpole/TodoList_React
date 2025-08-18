import {Fragment} from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";
import TodoItem from "../todo/TodoItem.jsx";

const TimeTable = ({hours, todos, deleteTodo, updateTodo, handleChangeTitle,handleToggleDone}) => {
    return (
        <div className="basis-3/5 p-5 flex flex-col h-screen bg-white text-gray-800 rounded-2xl">
            <h1 className="text-black font-bold text-2xl pb-4">Time Table</h1>
            <div className="grid grid-cols-[0.2fr_1fr_1fr] grid-rows-19 text-center h-full overflow-y-scroll scrollbar-hide">
                {/* Header */}
                <div className="text-sm font-semibold text-gray-500 border-b border-r border-gray-300 py-2"></div>
                <div className="text-sm font-semibold text-gray-500 border-b border-r border-gray-300 py-2">:00</div>
                <div className="text-sm font-semibold text-gray-500 border-b border-gray-300 py-2">:30</div>

                {/* Content */}
                {hours.map(([t00, t30], idx) => (
                    <Fragment key={idx}>
                        <div
                            className="flex justify-center items-center text-sm min-h-16 text-gray-500 border-b border-r border-gray-300 py-2">
                            {t00.slice(-5, -3)}
                        </div>
                        <Droppable droppableId={`slot-${t00}`}>
                            {(provided) => (
                                <div className="border-b border-r border-gray-300 hover:bg-gray-50 relative"
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                                >
                                    {todos
                                        .filter(todo => todo.schedule_time === t00)
                                        .map((todo, index) => {
                                            return (
                                                <Draggable
                                                    key={String(todo.id)}
                                                    draggableId={`slot-${todo.id}`}
                                                    index={index}
                                                >
                                                    {(p) => (
                                                        <div
                                                            className="p-2"
                                                            ref={p.innerRef}
                                                             {...p.draggableProps}
                                                             {...p.dragHandleProps}>
                                                            <TodoItem
                                                                todo={todo}
                                                                updateTodo={updateTodo}
                                                                deleteTodo={deleteTodo}
                                                                handleChangeTitle={handleChangeTitle}
                                                                handleToggleDone={handleToggleDone}
                                                            ></TodoItem>
                                                        </div>
                                                    )}
                                                </Draggable>)
                                        })
                                    }
                                    <div className="absolute"
                                    >{provided.placeholder}</div>
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId={`slot-${t30}`}>
                            {(provided) => (
                                <div className="border-b border-gray-300 hover:bg-gray-50"
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                                >
                                    {todos
                                        .filter(todo => todo.schedule_time === t30)
                                        .map((todo, index) => {
                                            return (
                                                <Draggable
                                                    key={String(todo.id)}
                                                    draggableId={`slot-${todo.id}`}
                                                    index={index}
                                                >
                                                    {(p) => (
                                                        <div
                                                            className = "p-2"
                                                            ref={p.innerRef}
                                                             {...p.draggableProps}
                                                             {...p.dragHandleProps}>
                                                            <TodoItem
                                                                todo={todo}
                                                                updateTodo={updateTodo}
                                                                deleteTodo={deleteTodo}
                                                                handleChangeTitle={handleChangeTitle}
                                                                handleToggleDone={handleToggleDone}
                                                            ></TodoItem>
                                                        </div>
                                                    )}
                                                </Draggable>)
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default TimeTable