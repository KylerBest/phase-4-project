import React from "react";
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar";
import {ReactComponent as MenuIcon} from "./icon-hamburger.svg"

function Header({setSearch, user, logout}){

    

    return (
        <header>
            <button className="mobile-nav-toggle" aria-controls="primary-navigation">
                <span className="visually-hidden">Menu</span>
                <MenuIcon className="icon-hamburger"/>
            </button>
            <SearchBar 
                setSearch={setSearch}
            />
            <button onClick={() => logout()}>Logout</button>
            {/* <Link to="/me" className="prof-pic-container" ><img className="prof-pic" src={`${process.env.PUBLIC_URL}/dog_prof_pic.jpg`} /></Link> */}
        </header>
    )
}

export default Header