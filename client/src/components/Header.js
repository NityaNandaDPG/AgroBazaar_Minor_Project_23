import React,{useState} from 'react';
import './Header.css';
import { AiOutlineSearch,AiOutlineShoppingCart,AiFillHome } from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from './resources/logo.jpg';
import { Outlet,Link } from 'react-router-dom';

function Header(){

    return(
        <header className="header ">
            <img className="logo" src={logo} alt=''/>
            <a href='/'><AiFillHome/></a>
            <a href='#'>Today's Market</a>
            <div className='menu'>
                <a className='menu-button' href='#'>Account</a>
                <div className='menu-content'>
                    {/* <a to="" href="#">Login</a> */}
                    <Link to="/login">Login</Link>
                    <Link to="/profile">My Profile</Link>
                    <Link to="/myorders">My Order</Link>
                </div>
            </div>
            <a href="/myproduct">Selling Hub</a>
            <Link to="/basket"><AiOutlineShoppingCart/></Link>
            <a href='#'><BiChat/></a>
        </header>
    );
}
export default Header;