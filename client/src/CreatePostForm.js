import {useState} from "react";
import {Link} from "react-router-dom";

function CreatePostForm({profilePicture, feed, setFeed, toggleCreatePostForm}){
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [showImageInput, setShowImageInput] = useState(false)
    const [postContent, setPostContent] = useState({
        text_content:"",
        image_url:""
    })

    function createPost(e){
        e.preventDefault()
        setIsLoading(true)
        fetch("/posts", {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(postContent)
        })
        .then(r => {
            setIsLoading(false)
            if(r.ok){
                r.json().then(post => {
                    e.target.reset()
                    setFeed([post, ...feed])
                    toggleCreatePostForm()
                })
            }
            else{
                r.json().then(e => setErrors(e.errors))
            }
        })
    }

    return(
        <div className="overlay" >
            <div className="create-post-form-toggle" onClick={() => toggleCreatePostForm()} />
            <div className="card">
                <form className="create-post-form" onSubmit={createPost}>
                    <label htmlFor="post-content">
                        <Link to="/profile/me" ><img className="prof-pic" src={profilePicture} alt="" /></Link>Create a post:
                    </label>
                    <textarea type="text" id="post-content" placeholder="What's up?" onChange={e => setPostContent({...postContent, text_content:e.target.value})} /> 
                    <div className="errors-container">{errors.map(e => <li className="error" key={e}>{e}</li>)}</div>
                    <div className="image-check-container">
                        <input id="image-check" type="checkbox" onChange={() => setShowImageInput(!showImageInput)}/>
                        <label htmlFor="image-check">Want to add an image?</label>
                    </div>
                    {showImageInput ? <input type="text" placeholder="Enter image url" onChange={e => setPostContent({...postContent, image_url:e.target.value})}/> : <></>}
                    <input className="submit-button" type="submit" value={isLoading ? "Loading..." : "Submit"}/>
                </form>
            </div>
        </div>
    )
}

export default CreatePostForm