import {useState} from "react";
import CreatePostForm from "./CreatePostForm"
import Post from "./Post"

function HomePage({user, profilePicture, feed, setFeed}){

    const [showCreatePostForm, setShowCreatePostForm] = useState(false)

    function toggleCreatePostForm(){
        setShowCreatePostForm(!showCreatePostForm)
    }

    return (
        <>
            {showCreatePostForm ? <CreatePostForm 
                user={user}
                profilePicture={profilePicture}
                feed={feed}
                setFeed={setFeed}
                toggleCreatePostForm={toggleCreatePostForm}
            /> : <></>}
            <div className="home-page">
                <h1>{user ? `Welcome, ${user.username}` : `Loading...`}</h1>
                <button onClick={() => toggleCreatePostForm()}>New post</button>
                <div className="feed-container">
                    {feed.length > 0 ? feed.map(post =>
                        <Post key={post.id} post={post} />
                    ) : <></>}
                </div>
            </div>
        </>
    )
} 

export default HomePage