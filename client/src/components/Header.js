import React,{useState} from 'react';
import './Header.css';
import { AiOutlineSearch } from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from './resources/logo.jpg';

function Header(){

    return(
        
        <header className="header">
            <img className="logo" src={logo} alt=''/>
            <a href='#'>Today's Market</a>
            <a href='#'>Vegetables</a>
            <a href='#'>Grocery</a>
            <form className='search-box'>
                <input className="input" type="text" placeholder="Search for Vegetables, Farmers and more"/>
                <button className="button" type='submit'><AiOutlineSearch /></button>
            </form>
            <div className='menu'>
                <a className='menu-button' href='#'>Account<IoMdArrowDropdown/></a>
                <div className='menu-content'>
                    <a href="#">Login</a>
                    <a href="#">My Wishlist</a>
                    <a href="#">My Order</a>
                    
                </div>
            </div>
            <a href='#'>Wishlist</a>
            <a href='#'>Bag</a>
            <a href='#'><BiChat/></a>
        </header>
    );
}
export default Header;