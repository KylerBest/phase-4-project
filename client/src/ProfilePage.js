import {useState} from "react";

function ProfilePage({user, setUser, profilePicture, deleteProfile}){
    const [profile, setProfile] = useState({
        profile_picture_url: user.profile_picture_url || "",
        bio: user.bio || ""
    })
    const [isLoading, setIsLoading] = useState(false)

    function updateProfile(e){
        e.preventDefault()
        setIsLoading(true)
        fetch(`/users/${user.id}`, {
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
                <img className="profile-page-pic" src={profilePicture} alt=""/>
                <h1>{user.username}</h1>
                <form>
                    <label htmlFor="profile-picture-url">Profile picture:</label>
                    <input id="profile-picture-url" type="text" placeholder="Enter image URL..." value={profile.profile_picture_url}
                    onChange={e => setProfile({...profile, profile_picture_url:e.target.value})}/>
                </form>
                <form>
                    <label htmlFor="bio">Bio:</label>
                    <textarea id="bio" placeholder="Who are you?" value={profile.bio} 
                    onChange={e => setProfile({...profile, bio:e.target.value})}/>
                </form>
                <form>
                    <input className="submit-button" type="submit" value={isLoading ? "Loading..." : "Change"} onClick={e => updateProfile(e)}/>
                    <input className="delete-profile-button" type="submit" value="Delete Account" onClick={() => deleteProfile()}/>
                </form>
            </div>
        </div>
    )
}

export default ProfilePage