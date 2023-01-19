import React from "react";
import {Link} from "react-router-dom";

function NavMenu({isShowingNavMenu, setIsShowingNavMenu, logout}){
    function menuToggle(){
        return isShowingNavMenu ? "nav-menu" : "nav-menu off-screen"
    }
    return (
        <div className={menuToggle()}>
            <Link to="/home" onClick={() => setIsShowingNavMenu(false)}>Home</Link>
            <Link to="/profile/me" onClick={() => setIsShowingNavMenu(false)}>Profile</Link>
            <p onClick={() => {
                setIsShowingNavMenu(false)
                logout()
            }}>Logout</p>
        </div>
    )
}

export default NavMenu