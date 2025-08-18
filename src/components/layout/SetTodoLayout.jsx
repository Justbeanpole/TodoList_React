import {Outlet, useLocation} from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import React from "react";
import NextButton from "../ui/NextButton.jsx";

const SetTodoLayout = () => {
    const location = useLocation();

    // 현재 페이지에 따라 다음 경로 지정
    let nextPath = null;
    if (location.pathname === "/") {
        nextPath = "/setPriority";
    }

    return (
        <div className="min-h-screen flex">
            <Navbar/>
            <div className="flex-grow flex flex-col">
                {/* 페이지의 메인 콘텐츠가 표시될 영역 */}
                <main className="container mx-auto flex-grow">
                    <Outlet/>
                </main>
            </div>
            {nextPath && <NextButton nextPath={nextPath}></NextButton>}
        </div>
    );
};

export default SetTodoLayout;
