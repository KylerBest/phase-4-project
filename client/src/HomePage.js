import CreatePostForm from "./CreatePostForm"
import Post from "./Post"

function HomePage({user, profilePicture, feed, setFeed}){

    return (
        <div className="home-page wrapper">
            <h1>{user ? `Welcome, ${user.username}` : `Loading...`}</h1>
            <CreatePostForm 
                user={user}
                profilePicture={profilePicture}
                feed={feed}
                setFeed={setFeed}
            />
            {feed.length > 0 ? feed.map(post =>
                <Post key={post.id} post={post} />
            ) : <></>}
        </div>
    )
} 

export default HomePage