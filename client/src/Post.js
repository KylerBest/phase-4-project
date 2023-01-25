import {useState} from "react"

function Post({user, post, deletePost, likes, setLikes}){ 
    const [likeCount, setLikeCount] = useState(post.users_liked.length)
    const [likedByMe, setLikedByMe] = useState(user.liked_posts.map(p => p.id).includes(post.id))
    const postDate = `${post.created_at.slice(5, 7)}/${post.created_at.slice(8,10)}/${post.created_at.slice(0,4)}`
    const myPost = post.user.id === user.id
    function style(){
        const size = `span ${(Math.floor(post.text_content.length / 150)) + (post.image_url ? 1 : 0) + 1}`
        return {
            gridRow: `${size}/${size}`,
            gridColumn: `${size}/${size}`
        }
    }

    function likePost(){
        fetch("/likes", {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({post_id:post.id})
        })
        .then(r => {
            if(r.ok){
                r.json().then(post => {
                    setLikeCount(post.users_liked.length)
                    setLikedByMe(true)
                    setLikes([...likes, post])
                })
            }else{
                r.json().then(console.log)
            }
        })
    }

    return (
        <div style={style()} className={`post card ${myPost ? 'my-post': ''}`}>
            <div className="post-user-container">
                <div className="post-user-inner">
                    <img className="prof-pic" src={post.user.profile_picture_url || `${process.env.PUBLIC_URL}/dog_prof_pic.jpg`} />
                    <h1>{post.user.username}:</h1>
                </div>
                {myPost ? <button className="delete-post-button" onClick={() => deletePost(post)} >delete</button> : <></>}
            </div>
            <div className="post-image-container">
                <img className="post-image" src={post.image_url}/>
                <div className="post-image-shadow"/>
            </div>
            <div className="post-content-container">
                <p>{post.text_content}</p>
            </div>
            <div className="like-button-container">
                <div className="like-button-inner">
                    <div id="like-button" className={likedByMe ? "liked-by-me" : ""}>
                        <button disabled={likedByMe} onClick={() => likePost(post)} className="like-button">{likedByMe ? "✅" : "👍"}</button>
                    </div>
                    <p className="like-counter">{likeCount}</p>
                </div>
                <p className="post-date">{postDate}</p>
            </div>
        </div>
    )
}

export default Post