import React from "react"

function Post({post}){

    function style(){
        const big = `span ${(Math.floor(post.text_content.length / 100)) + (post.image_url ? 1 : 0) + 1}`
        return {
            gridRow: `${big}/${big}`,
            gridColumn: `${big}/${big}`
        }
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
                <div>
                    <button className="like-button">👍</button>
                    <p className="like-counter">Likes: 0</p>
                </div>
            </div>
        </div>
    )
}

export default Post