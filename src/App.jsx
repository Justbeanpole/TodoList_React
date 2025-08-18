import './App.css'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import SetPriorityPage from "./pages/SetPriorityPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import SetTodoLayout from "./components/layout/SetTodoLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import ContentLayout from "./components/layout/ContentLayout.jsx";
import {TodoProvider} from "./context/TodoContext.jsx";


function App() {
    return (
        <TodoProvider>
            <BrowserRouter>
                <Routes>
                    {/* 그룹 1: 메인 레이아웃을 사용하는 페이지들 */}
                    {/*<Route element={<ContentLayout/>}>*/}
                    {/*    <Route path="/todos" element={<CalendarPage/>}/>*/}
                    {/*    /!* 여기에 프로필 페이지 등이 추가될 수 있습니다. *!/*/}
                    {/*</Route>*/}
                    {/* 그룹 2: 인증 레이아웃을 사용하는 페이지들 */}
                    <Route element={<SetTodoLayout/>}>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/setPriority" element={<SetPriorityPage/>}/>
                    </Route>
                    {/* 그룹 3: 어떤 레이아웃도 사용하지 않는 페이지 */}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </TodoProvider>
    );
}

export default App
