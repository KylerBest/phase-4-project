import React from "react";

function SearchBar({setSearch}){
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search posts, users..." onChange={e => setSearch(e.target.value)}/>
            <button>🔍</button>
        </div>
    )
}

export default SearchBar