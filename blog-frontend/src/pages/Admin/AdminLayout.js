import React from 'react';
import { TiEyeOutline } from "react-icons/ti";
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className=' flex flex-col h-screen lg:flex-row '>
            <Header />
            <main className='bg-[#f9f9f9] flex-1 p-4 lg:p-6 '>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout;

