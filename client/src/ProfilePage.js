import {useState} from "react";

function ProfilePage({user, setUser}){
    const profPic = user ? user.profile_picture_url || `${process.env.PUBLIC_URL}/dog_prof_pic.jpg` : `${process.env.PUBLIC_URL}/dog_prof_pic.jpg`
    const [profile, setProfile] = useState({
        profile_picture_url:user ? user.profile_picture_url : null,
        bio:user ? user.bio : null
    })
    const [isLoading, setIsLoading] = useState(false)

    function updateProfile(e){
        e.preventDefault()
        setIsLoading(true)
        fetch(`/update_profile`, {
            method: 'PATCH',
            headers: {
                "Content-Type":"application/json"
            }, 
            body: JSON.stringify(profile)
        })
        .then(r => {
            if(r.ok){
                r.json().then(setUser)
            }else{
                r.json().then(console.log)
            }
            setIsLoading(false)
        })
    }

    return(
        <div className="wrapper">
            <div className="card profile-page">
                <h1>{user ? `${user.username}'s profile:` : <></>}</h1>
                <img className="profile-page-pic" src={profPic} />
                <form>
                    <label htmlFor="profile-picture-url">Profile picture:</label>
                    <input id="profile-picture-url" type="text" placeholder="Enter image URL..." value={profile.profile_picture_url || ""}
                    onChange={e => setProfile({...profile, profile_picture_url:e.target.value})}/>
                </form>
                <form>
                    <label htmlFor="bio">Bio:</label>
                    <textarea id="bio" type="text" placeholder="Who are you?" value={profile.bio || ""} 
                    onChange={e => setProfile({...profile, bio:e.target.value || ""})}/>
                    <input className="submit-button" type="submit" value={isLoading ? "Loading..." : "Change"} onClick={e => updateProfile(e)}/>
                </form>
            </div>
        </div>
    )
}

export default ProfilePage