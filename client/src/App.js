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
    nav('/home')
  }

  function logout(){
    fetch("/logout", {
        method:'DELETE'
    })
    .then(r => {
        if(r.ok){
            setUser(null)
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
          path='/profile'
          element={<ProfilePage
            user={user}
            setUser={setUser}
          />}
        />

        <Route 
          path='/home'
          element={
            <HomePage
              user={user}
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
