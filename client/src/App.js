import {useState, useEffect} from 'react';
import './App.scss';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import ProfilePage from './ProfilePage';


function App() {
  const nav = useNavigate()
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)
  const [feed, setFeed] = useState([])
  const [likes, setLikes] = useState([])
  const [profilePicture, setProfilePicture] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/me").then(r => {
      setIsLoading(false)
      if(r.ok) {
        r.json().then(onLogin)
      }else{
        nav('/login')
      }
    })
  }, [])

  function onLogin(user){
    setUser(user)
    setProfilePicture(user.profile_picture_url || `${process.env.PUBLIC_URL}/dog_prof_pic.jpg`)
    setLikes(user.liked_posts)
    fetch("/posts").then(r => {
      if(r.ok){
        r.json().then(feed => {
          setFeed(feed)
        })
      }
    })
  }

  function logout(){
    fetch("/logout", {
        method:'DELETE'
    })
    .then(r => {
        if(r.ok){
            setUser(null)
            setFeed([])
            setLikes([])
            setSearch('')
            nav('/login')
        }
    })
  }

  function deleteProfile(){
    fetch(`/users/${user.id}`, {
        method:'DELETE'
    })
    .then(r => {
        if(r.ok){
          setUser(null)
          setFeed([])
          setLikes([])
          setSearch('')
          nav('/login')
        }
    })
}

  return (
  <div className='App'>
    {user ? <Header 
      setSearch={setSearch}
      user={user}
      logout={logout}
      profilePicture={profilePicture}
    /> : <></>}
    <div className='body'>
      {isLoading ? <div className='wrapper'><h1>Loading...</h1></div> : <Routes>

        <Route 
          path='/profile/me'
          element={ user ?
          <ProfilePage
            user={user}
            setUser={setUser}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            logout={logout}
            deleteProfile={deleteProfile}
          />
          : <h1>Loading...</h1>}
        />

        <Route 
          path='/liked_posts'
          element={
            <HomePage
            user={user}
            profilePicture={profilePicture}
            feed={feed}
            setFeed={setFeed}
            search={search}
            likes={likes}
            setLikes={setLikes}
            likesOnly={true}
            />
          }
        />

        <Route 
          path='/home'
          element={
            <HomePage
            user={user}
            profilePicture={profilePicture}
            feed={feed}
            setFeed={setFeed}
            search={search}
            likes={likes}
            setLikes={setLikes}
            likesOnly={false}
            />
          }
        />

        <Route
          path='/login'
          element={
            <LogInForm
              onLogin={onLogin}
              nav={nav}
            />
          }
        />  

        <Route
          path='/create_account'
          element={
            <SignUpForm
              onLogin={onLogin}
              nav={nav}
            />
          }
        />

        <Route 
          path='/'
          element={
            <Navigate to="/login"/>
        }
        />
      </Routes>}
    </div>
  </div>
  );
}

export default App;
