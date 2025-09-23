"use client"

import React from 'react';
import {  signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { useRouter } from "next/navigation";

import './styles.scss';

const Navbar = () => {
     const router = useRouter();

    const handleLogout = async ()=>{
        await signOut(auth)
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