import {useState} from "react";
import {Link} from "react-router-dom"

function SignUpForm({onLogin, nav}){
    const [credentials, setCredentials] = useState({
        username:"",
        password:"",
        password_confirmation:""
    })
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function signUp(e){
        e.preventDefault()
        setIsLoading(true)
        fetch("/signup", {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(credentials)
        })
        .then(r => {
            setIsLoading(false)
            if(r.ok){
                r.json().then(user => {
                    onLogin(user)
                    nav('/home')
                })
            }else{
                r.json().then(e => setErrors(e.errors))
            }
        })
    }

    return (
        <div className="wrapper">
            <div className="login card">
                <form onSubmit={signUp}>
                    <h1 className="logo">BarkBook</h1>
                    <h2>Sign up</h2>
                    <input type="text" placeholder="Username" onChange={e => setCredentials({...credentials, username:e.target.value})}/>
                    <input type="password" placeholder="Password" onChange={e => setCredentials({...credentials, password:e.target.value})}/>
                    <input type="password" placeholder="Confirm password" onChange={e => setCredentials({...credentials, password_confirmation:e.target.value})}/>
                    <div className="errors-container">{errors.map(e => <li className="error" key={e}>{e}</li>)}</div>
                    <input className="submit-button" type="submit" value={isLoading ? "Loading..." : "Continue"}/>
                    <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm