import {useState} from "react"

function Post({user, post, search}){ 
    const [likeCount, setLikeCount] = useState(post.users_liked.length)
    const [likedByMe, setLikedByMe] = useState(user.liked_posts.map(p => p.id).includes(post.id))
    const postDate = `${post.created_at.slice(5, 7)}/${post.created_at.slice(8,10)}/${post.created_at.slice(0,4)}`

    function style(){
        const big = `span ${(Math.floor(post.text_content.length / 100)) + (post.image_url ? 1 : 0) + 1}`
        return {
            gridRow: `${big}/${big}`,
            gridColumn: `${big}/${big}`
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
                r.json().then(like => {
                    setLikeCount(like.post.users_liked.length)
                    setLikedByMe(true)
                })
            }else{
                r.json().then(console.log)
            }
        })
    }

    return (
        <div style={style()} className={`post card`}>
            <div className="post-user-container">
                <img className="prof-pic" src={post.user.profile_picture_url} />
                <h1>{post.user.username}:</h1>
            </div>
            <div className="post-image-container">
                <img className="post-image" src={post.image_url}/>
                <div className="post-image-shadow"/>
            </div>
            <div className="post-content-container">
                <p>{post.text_content}</p>
            </div>
            <div className="like-button-container">
                <div className={likedByMe ? "liked-by-me" : ""}>
                    <button disabled={likedByMe} onClick={() => likePost()} className="like-button">{likedByMe ? "✅" : "👍"}</button>
                    <p className="like-counter">Likes: {likeCount}</p>
                </div>
                <p className="post-date">{postDate}</p>
            </div>
            {/* {myPost ? <button className="delete-post-button">delete ❌</button> : <></>} */}
        </div>
    )
}

export default Post