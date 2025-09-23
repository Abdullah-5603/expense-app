"use client"

import React from 'react';
import { useRouter } from "next/navigation";

import './styles.scss';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const {logout} = useAuth();
     const router = useRouter();

    const handleLogout = async ()=>{
        await logout()
        .then(()=> router.replace('/login'))
    }

    return (
        <div className='expense-navbar'>
            <h4 className='expense-navbar__logo'>Expense Calculator</h4>
            <button className='expense-navbar__logout' onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Navbar;