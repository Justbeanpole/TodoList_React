import './App.css'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import SetPriorityPage from "./pages/SetPriorityPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import SetTodoLayout from "./components/layout/SetTodoLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import {TodoProvider} from "./context/TodoContext.jsx";


function App() {
    return (
        <TodoProvider>
            <BrowserRouter basename="/TodoList_React">
                <Routes>
                    {/* 그룹 1: Todo 입력 및 설정 레이아웃을 사용하는 페이지들 */}
                    <Route element={<SetTodoLayout/>}>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/setPriority" element={<SetPriorityPage/>}/>
                    </Route>
                    {/* 그룹 2: 어떤 레이아웃도 사용하지 않는 페이지 */}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </TodoProvider>
    );
}

export default App
