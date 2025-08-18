import TodoItem from "../components/todo/TodoItem.jsx";
import {useMemo, useState} from "react";
import Top3Priorities from "../components/ui/Top3Priorities.jsx";
import TimeTable from "../components/ui/TimeTable.jsx";
import {useTodos} from "../hooks/useTodos.js";
import {
    DragDropContext,
    Draggable,
    Droppable,
} from 'react-beautiful-dnd';

const SetPriorityPage = () => {
    const filter = useMemo(() => ({orderBy: "list_order"}), [])
    const {todos, reload, addTodo, deleteTodo, updateTodo, setTodos} = useTodos(filter);

    const unprioritized = useMemo(
        () => todos.filter(t => t.priority == null && t.schedule_time == null),
        [todos]
    );
    const prioritized = useMemo(
        () => todos.filter(t => t.priority != null),
        [todos]
    );
    const handleChangeTitle = (id, itemTitle) =>{
        setTodos((prev) => prev.map((item) => item.id === id ? {...item, title: itemTitle} : item
        ));
    }
    const handleToggleDone =  (id, next) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, done: next } : t));
        updateTodo(id, { done: next });
    };

    const slots = useMemo(() => {
        const times = [];
        for (let h = 5; h <= 23; h++) {
            times.push(`${h}:00`);
            times.push(`${h}:30`);
        }
        return times;
    }, []);

    const hours = useMemo(() => {
        const row = [];
        for (let hour = 0; hour < slots.length; hour += 2) {
            row.push([slots[hour], slots[hour + 1]])
        }
        return row
    }, [slots])

    const computeNewOrderNumeric = (prevItem, nextItem) => {
        const GAP = 1000;
        const toNum = (v) => (v == null ? null : Number(v));
        const prev = toNum(prevItem?.list_order);
        const next = toNum(nextItem?.list_order);
        if (prev != null && next != null) return (prev + next) / 2;
        if (prev == null && next != null) return next - GAP; // 맨 앞
        if (prev != null && next == null) return prev + GAP; // 맨 뒤
        return GAP; // 비어 있는 리스트
    }

    const onDragEnd = async (result) => {
        const {source, destination, draggableId} = result;
        if (!destination) return;

        // 같은 자리로 떨어지면 무시
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;
        const id = draggableId
        // todo리스트 내에서
        if (source.droppableId === "todoList" && destination.droppableId === "todoList") {
            const next = (() => {
                const arr = Array.from(todos); // 현재 화면에 보이는 리스트(필요하면 같은 날짜만 필터)
                const from = arr.findIndex(t => t.id === id);
                const [moved] = arr.splice(from, 1);
                arr.splice(destination.index, 0, moved);
                return arr;
            })();
            const prevItem = next[destination.index - 1];
            const nextItem = next[destination.index + 1];
            const newOrder = computeNewOrderNumeric(prevItem, nextItem);
            setTodos(next);
            await updateTodo(id, {list_order: newOrder})
        }
        // todo리스트 -> 우선순위
        if (source.droppableId === "todoList" && destination.droppableId.startsWith("top3-")) {
            const lane = destination.droppableId.slice(5);
            if (lane) {
                setTodos(prev => {
                    // 목적지 lane에 이미 있으면 그 아이는 해제(null)
                    const existing = prev.find(t => t.priority === lane);
                    const next = prev.map(t => {
                        if (t.id === id) return {...t, priority: lane};          // 새로운 것
                        if (existing && t.id === existing.id) return {...t, priority: null}; // 기존
                        return t;
                    });
                    return next;
                });
                const existing = todos.find(t => t.priority === lane);
                await updateTodo(id, {priority: lane});
                if (existing && existing.id !== id) {
                    await updateTodo(existing.id, {priority: null});
                }
            }
        }
        // 우선순위 -> todo리스트
        if (source.droppableId.startsWith("top3-") && destination.droppableId === "todoList") {
            const lane = source.droppableId.slice(5);
            setTodos(prev => prev.map(t =>
                t.priority === lane ? { ...t, priority: null } : t
            ));
            await updateTodo(id, {priority: null});
        }
        // todo리스트 -> 타임테이블
        if (source.droppableId === "todoList" && destination.droppableId.startsWith("slot-")) {
            const scheduled = destination.droppableId.slice(5);
            setTodos(prev => prev.map(t =>
                t.id === id ? { ...t, schedule_time: scheduled } : t
            ));
            await updateTodo(id, {schedule_time: scheduled});
        }
        // 타임테이블 내에서
        if (source.droppableId.startsWith("slot-") && destination.droppableId.startsWith("slot-")) {
            const oldScheduled = destination.droppableId.slice(5);
            const newScheduled = source.droppableId.slice(5);
            if (oldScheduled && newScheduled) {
                setTodos(prev => {
                    // 목적지 lane에 이미 있으면 그 아이는 해제(null)
                    const existing = prev.find(t => t.schedule_time === oldScheduled);
                    const next = prev.map(t => {
                        if (t.id === id.slice(5)) return {...t, schedule_time: oldScheduled};        // 새로운 것
                        if (existing && t.id === existing.id) return {...t, priority: newScheduled}; // 기존
                        return t;
                    });
                    return next;
                });
                const existing = todos.find(t => t.schedule_time === oldScheduled);
                await updateTodo(id.slice(5), {schedule_time: oldScheduled});
                if (existing && existing.id !== id.slice(5)) {
                    await updateTodo(existing.id.slice(5), {schedule_time: newScheduled});
                }
            }
        }
        // 타임테이블 -> todo리스트
        if (source.droppableId.startsWith("slot-") && destination.droppableId === "todoList"){
            console.log(id)
            setTodos(prev => prev.map(t =>
                t.id === id ? { ...t, schedule_time: null } : t
            ));
            await updateTodo(id.slice(5), {schedule_time: null});
        }
        // 타임테이블 -> 우선순위
        if (source.droppableId.startsWith("slot-") && destination.droppableId.startsWith("top3-")) {
            const lane = destination.droppableId.slice(5);
            setTodos(prev => prev.map(t =>
                t.id === id ? { ...t, priority : lane} : t
        ));
            await updateTodo(id.slice(5), {priority: lane});
        }
        // 우선순위 내에서
        if(source.droppableId.startsWith("top3-") && destination.droppableId.startsWith("top3-")) {
            const oldLane = destination.droppableId.slice(5);
            const newLane = source.droppableId.slice(5);
            if (oldLane) {
                setTodos(prev => {
                    // 목적지 lane에 이미 있으면 그 아이는 해제(null)
                    const existing = prev.find(t => t.priority === oldLane);
                    const next = prev.map(t => {
                        if (t.id === id) return {...t, priority: oldLane};          // 새로운 것
                        if (existing && t.id === existing.id) return {...t, priority: newLane}; // 기존
                        return t;
                    });
                    return next;
                });
                const existing = todos.find(t => t.priority === oldLane);
                await updateTodo(id, {priority: oldLane});
                if (existing && existing.id !== id) {
                    await updateTodo(existing.id, {priority: newLane});
                }
            }
        }
        // 우선순위 -> 타임테이블
        if(source.droppableId.startsWith("top3-") && destination.droppableId.startsWith("slot-")){
            const scheduled = destination.droppableId.slice(5);
            console.log(id)
            setTodos(prev => prev.map(t =>
                t.id === id ? { ...t, schedule_time : scheduled} : t
            ));
            await updateTodo(id, {schedule_time: scheduled});
        }
    }

    return (
        <div className="flex h-full ">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="basis-2/6 flex flex-col">
                    <Top3Priorities
                        todos={prioritized}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                        handleChangeTitle={handleChangeTitle}
                        handleToggleDone={handleToggleDone}
                    ></Top3Priorities>
                    <Droppable droppableId="todoList">
                        {(provided) => (
                            <div className="basis-3/4 p-5 flex flex-col gap-2"
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}>
                                {unprioritized.map((todo, index) => {
                                    console.log(todo)
                                    return (
                                        <Draggable key={todo.id}
                                                   draggableId={String(todo.id)}
                                                   index={index}>
                                            {(p) => (
                                                <div
                                                    ref={p.innerRef}
                                                    {...p.draggableProps}
                                                    {...p.dragHandleProps}
                                                >
                                                    <TodoItem
                                                        todo={todo}
                                                        key={todo.id}
                                                        updateTodo={updateTodo}
                                                        deleteTodo={deleteTodo}
                                                        handleChangeTitle={handleChangeTitle}
                                                        handleToggleDone={handleToggleDone}
                                                        className="cursor-grab active:cursor-grabbing"
                                                    ></TodoItem>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <TimeTable
                    hours={hours}
                    todos={todos}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                    handleChangeTitle={handleChangeTitle}
                    handleToggleDone={handleToggleDone}
                ></TimeTable>
            </DragDropContext>
        </div>
    )
}

export default SetPriorityPage