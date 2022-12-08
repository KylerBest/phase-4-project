import React from "react"

function Post({post}){
    return (
        <p>{post.user.username}: {post.text_content}</p>
    )
}

export default Post