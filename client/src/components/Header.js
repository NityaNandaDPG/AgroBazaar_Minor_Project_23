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
            {/* <a href='#'>Vegetables</a>
            <a href='#'>Fruits</a>
            <a href='#'>Foods</a> */}
            {/* <form className='search-box'>
                <input className="input" type="text" placeholder="Search for Vegetables, Farmers and more"/>
                <button className="button" type='submit'><AiOutlineSearch /></button>
            </form> */}
            <div className='menu'>
                <a className='menu-button' href='#'>Account</a>
                <div className='menu-content'>
                    {/* <a to="" href="#">Login</a> */}
                    <Link to="/login">Login</Link>
                    <Link to="/profile">My Profile</Link>
                    <a href="#">My Order</a>
                    <Link to="/myproduct">My Products</Link>

                    
                </div>
            </div>
            <a href='#'>Wishlist</a>
            {/* <a href=''>Bag</a> */}
            <Link to="/basket"><AiOutlineShoppingCart/></Link>
            <a href='#'><BiChat/></a>
        </header>
    );
}
export default Header;