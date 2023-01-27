import React, {useState} from "react";

function RatePostForm({post, likePost, toggleRatePostForm}){

    const [rating, setRating] = useState(1)

    return (
        <div className="overlay">
            <div className="create-post-form-toggle" onClick={() => toggleRatePostForm()} />
            <div className="card">
                <h1>Rate post:</h1>
                <div className="rating-container">
                    <button onClick={() => setRating(rating < 5 ? rating + 1 : rating)}>⬆️</button>
                    <h2>⭐{rating}</h2>
                    <button onClick={() => setRating(rating > 1 ? rating - 1 : rating)}>⬇️</button>
                </div>
                <button className="submit-button" onClick={() => likePost(rating)} >Submit</button>
            </div>
        </div>
    )
}

export default RatePostForm