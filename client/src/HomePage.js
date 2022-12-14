import {useState} from "react";
import CreatePostForm from "./CreatePostForm"
import Post from "./Post"

function HomePage({user, profilePicture, feed, setFeed, search}){

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
                    {feed.length > 0 ? feed.filter(post => {
                        return post.text_content.toLowerCase().includes(search.toLowerCase()) || post.user.username.toLowerCase().includes(search.toLowerCase())
                    }).map(post =>
                        <Post key={post.id} post={post} user={user} search={search}/>
                    ) : <></>}
                </div>
            </div>
        </>
    )
} 

export default HomePage