import React from "react";

function HomePage({user}){
    return (
        <div className="home-page">
            <h1>Welcome, {user.username}</h1>
        </div>
    )
}

export default HomePage