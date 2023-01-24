import {useState} from "react";
import CreatePostForm from "./CreatePostForm"
import Post from "./Post"

function HomePage({user, profilePicture, feed, setFeed, search}){

    const [showCreatePostForm, setShowCreatePostForm] = useState(false)
    const [showLikedPostsOnly, setShowLikedPostsOnly] = useState(false)

    const feedWithSearch = feed.filter(post => post.text_content.toLowerCase().includes(search.toLowerCase()) || post.user.username.toLowerCase().includes(search.toLowerCase()))
    const filteredFeed = showLikedPostsOnly ? feedWithSearch.filter(post => user.liked_posts.map(p => p.id).includes(post.id)) : feedWithSearch

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
                <div>
                    <input id="liked-filter" type="checkbox" onChange={() => setShowLikedPostsOnly(!showLikedPostsOnly)} />
                    <label htmlFor="liked-filter">Only show liked posts</label>
                </div>
                <div className="feed-container">
                    {feed.length > 0 ? filteredFeed.map(post =>
                        <Post key={post.id} post={post} user={user} search={search}/>
                    ) : <></>}
                </div>
            </div>
        </>
    )
} 

export default HomePage