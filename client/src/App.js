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
  const profilePicture = user && user.profile_picture_url ? user.profile_picture_url : `${process.env.PUBLIC_URL}/dog_prof_pic.jpg`

  useEffect(() => {
    fetch("/me").then(r => {
      if(r.ok) {
        r.json().then(onLogin)
      }else{
        nav('/login')
      }
    })
  }, [])

  function onLogin(user){
    setUser(user)
    fetch("/posts").then(r => {
      if(r.ok){
        r.json().then(feed => {
          setFeed(feed)
          setLikes(feed.filter(post => user.liked_posts.map(p => p.id).includes(post.id)))
        })
      }
    })
    nav('/home')
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
      <Routes>

        <Route
          path='/login'
          element={
            <LogInForm
              onLogin={onLogin}
            />
          }
        />  

        <Route
          path='/create_account'
          element={
            <SignUpForm
              onLogin={onLogin}
            />
          }
        />

        <Route 
          path='/profile/me'
          element={<ProfilePage
            user={user}
            setUser={setUser}
            profilePicture={profilePicture}
            logout={logout}
            deleteProfile={deleteProfile}
          />}
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
            />
        }
        />

        <Route 
          path='/'
          element={
            <Navigate to="/login"/>
        }
        />
      </Routes>
    </div>
  </div>
  );
}

export default App;
