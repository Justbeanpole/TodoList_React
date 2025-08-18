import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from "./Header.jsx"; // 잠시 후 만들 네비게이션 컴포넌트

/**
 * 애플리케이션의 전체적인 레이아웃을 정의하는 컴포넌트입니다.
 * 모든 페이지는 이 레이아웃 내의 <main> 영역에 렌더링됩니다.
 */
const ContentLayout = () => {
    return (
        <div className="min-h-screen flex flex-row">
            {/* 사이드 네비게이션 바 */}
            <Navbar />
            {/* 페이지의 메인 콘텐츠가 표시될 영역 */}
            <div className="flex flex-col flex-grow">
                <Header />
                <main className="flex-grow p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ContentLayout;
