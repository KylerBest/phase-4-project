import {useState} from "react";
import SearchBar from "./SearchBar";
import {Link} from "react-router-dom"
import {ReactComponent as MenuIcon} from "./icon-hamburger.svg"
import NavMenu from "./NavMenu";

function Header({setSearch, user, logout}){
    const profPic = user ? user.profile_picture_url || `${process.env.PUBLIC_URL}/dog_prof_pic.jpg` : `${process.env.PUBLIC_URL}/dog_prof_pic.jpg`

    const [isShowingNavMenu, setIsShowingNavMenu] = useState(false)


    return (
        <header>
            <div className="logo-container">
                <button className="nav-toggle" onClick={() => setIsShowingNavMenu(!isShowingNavMenu)} aria-controls="primary-navigation">
                    <span className="visually-hidden">Menu</span>
                    <MenuIcon className="icon-hamburger"/>
                </button>
                <Link to="/home" className="logo">BarkBook</Link>
            </div>
            <NavMenu 
                isShowingNavMenu={isShowingNavMenu}
                setIsShowingNavMenu={setIsShowingNavMenu}
                logout={logout}
            />
            <SearchBar 
                setSearch={setSearch}
            />
            <Link to="/profile" ><img className="prof-pic" src={profPic} /></Link>
        </header>
    )
}

export default Header