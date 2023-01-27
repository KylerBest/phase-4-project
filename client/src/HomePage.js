import {useState} from "react";
import CreatePostForm from "./CreatePostForm"
import Post from "./Post"

function HomePage({user, profilePicture, feed, setFeed, search, likes, setLikes, likesOnly}){

    const [showCreatePostForm, setShowCreatePostForm] = useState(false)

    function addSearch(posts){
        return posts.filter(post => post.text_content.toLowerCase().includes(search.toLowerCase()) || post.user.username.toLowerCase().includes(search.toLowerCase()))
    }
    
    const posts = likesOnly ? addSearch(likes) : addSearch(feed)
    
    function toggleCreatePostForm(){
        setShowCreatePostForm(!showCreatePostForm)
    }

    function deletePost(post){
        fetch(`/posts/${post.id}`, {
            method: 'DELETE'
        })
        .then(r => {
            if(r.ok){
                setFeed(feed.filter(p => p.id !== post.id))
                setLikes(likes.filter(p => p.id !== post.id))
                console.log(feed)
            }
        })
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
                    {feed.length > 0 ? posts.map(post =>
                        <Post key={post.id} post={post} user={user} search={search} deletePost={deletePost} likes={likes} setLikes={setLikes}/>
                    ) : <></>}
                </div>
            </div>
        </>
    )
} 

export default HomePage