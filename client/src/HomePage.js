
function HomePage({user}){

    return (
        <div className="home-page wrapper">
            <h1>{user ? `Welcome, ${user.username}` : `Loading...`}</h1>
        </div>
    )
}

export default HomePage