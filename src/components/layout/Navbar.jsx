import React from 'react';
import {Link} from 'react-router-dom';
import {ListTodo, Home} from 'lucide-react'; // 아이콘 사용
import { Waypoints } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="text-black w-14 flex flex-col items-center py-4 border-2">
            <nav className="flex flex-col gap-8">
                {/* 로고 */}
                <Link to="/" className="flex items-center justify-center">
                    <ListTodo className="" size={30}/> {/*아이콘*/}
                </Link>

                {/* 네비게이션 링크 */}
                {/* Main Page */}
                <Link to="/" className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-200">
                    <Home size={25}/>
                </Link>
                {/* Priority Page */}
                <Link to="/setPriority" className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-200">
                    <Waypoints size={25}></Waypoints>
                </Link>
            </nav>
        </div>
    );
};

export default Navbar;