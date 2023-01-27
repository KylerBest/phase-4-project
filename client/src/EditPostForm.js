import {useState} from "react";
import {Link} from "react-router-dom";

function CreatePostForm({id, postContent, setPostContent, toggleEditPostForm, profilePic}){
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [showImageInput, setShowImageInput] = useState(!!postContent.image_url)
    const [newPostContent, setNewPostContent] = useState({
        text_content:postContent.text_content,
        image_url:postContent.image_url
    })
    

    function editPost(e){
        e.preventDefault()
        setIsLoading(true)
        fetch(`/posts/${id}`, {
            method:'PATCH',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newPostContent)
        })
        .then(r => {
            setIsLoading(false)
            if(r.ok){
                r.json().then(post => {
                    setPostContent(newPostContent)
                    toggleEditPostForm()
                })
            }
            else{
                r.json().then(e => setErrors(e.errors))
            }
        })
    }

    return(
        <div className="overlay" >
            <div className="create-post-form-toggle" onClick={() => toggleEditPostForm()} />
            <div className="card">
                <form className="create-post-form" onSubmit={e => editPost(e)}>
                    <label htmlFor="post-content">
                        <Link to="/profile/me" ><img className="prof-pic" src={profilePic} alt="" /></Link>Edit post:
                    </label>
                    <textarea type="text" id="post-content" placeholder="What's up?" value={newPostContent.text_content} onChange={e => setNewPostContent({...newPostContent, text_content:e.target.value})} /> 
                    <div className="errors-container">{errors.map(e => <li className="error" key={e}>{e}</li>)}</div>
                    <div className="image-check-container">
                        <input id="image-check" type="checkbox" checked={showImageInput} onChange={() => setShowImageInput(!showImageInput)}/>
                        <label htmlFor="image-check">Want to add an image?</label>
                    </div>
                    {showImageInput ? <input type="text" placeholder="Enter image url" value={newPostContent.image_url} onChange={e => setNewPostContent({...newPostContent, image_url:e.target.value})}/> : <></>}
                    <input className="submit-button" type="submit" value={isLoading ? "Loading..." : "Submit"}/>
                </form>
            </div>
        </div>
    )
}

export default CreatePostForm