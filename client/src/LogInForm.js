import {useState} from "react";
import {Link} from "react-router-dom"

function LogInForm({onLogin}){
    const [credentials, setCredentials] = useState({
        username:"",
        password:""
    })
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function login(e){
        e.preventDefault()
        setIsLoading(true)
        fetch("/login", {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(credentials)
        })
        .then(r => {
            setIsLoading(false)
            if(r.ok){
                r.json().then(onLogin)
            }else{
                r.json().then(e => setErrors(e.errors))
            }
        })
    }

    return (
        <div className="wrapper">
            <div className="login card">
                <form onSubmit={login}>
                    <h1 className="logo">BarkBook</h1>
                    <h2>Sign in</h2>
                    <input type="text" placeholder="Username" onChange={e => setCredentials({...credentials, username:e.target.value})}/>
                    <input type="password" placeholder="Password" onChange={e => setCredentials({...credentials, password:e.target.value})}/>
                    <div className="errors-container">{errors.map(e => <li className="error" key={e}>{e}</li>)}</div>
                    <input className="submit-button" type="submit" value={isLoading ? "Loading..." : "Continue"}/>
                    <p>Don't have an account? <Link to="/create_account">Sign up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default LogInForm