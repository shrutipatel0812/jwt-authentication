import axios from 'axios'
import React, { useContext,useState } from 'react'
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';
import Button from '../css/Button.css'
import LoginWithGoogle from './LoginWithGoogle'
import LoginWithFacebook from './LoginWithFacebook';



function Register() {
    const[email,setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordverify] = useState("")
    const {getLoggedIn}= useContext(AuthContext);
    const history =useHistory();

    async function register(e){
        e.preventDefault();
        try{
            const registerData={
                email,
                password,
                passwordVerify
            }
            console.log(registerData);
            await axios.post("http://localhost:5000/users/register" ,registerData)
            await getLoggedIn();
            history.push("/");

        }catch(err){
            console.error(err);
        }
    }


    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h3 className="card-title d-flex justify-content-center align-items-center">REGISTER</h3>
                                <form onSubmit={register} className="validated-form" noValidate>
                                    <div className="mb-3">
                                        <label className="form-label" >Email</label>
                                        <input text="email" className="form-control" placeholder="Email" 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            value={email}>
                                        </input>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" >Password</label>
                                        <input type="password" className="form-control" name="password" required placeholder="Password" 
                                            onChange={(e)=>setPassword(e.target.value)} 
                                            value={password}>
                                        </input>
                                    </div>
                                    
                                    <div className="mb-3">
                                    <label className="form-label">Password Verify</label>
                                        <input type="password" className="form-control" name="passwordVerify" required placeholder="Password" 
                                            onChange={(e)=>setPasswordverify(e.target.value)} 
                                            value={passwordVerify}>
                                        </input>
                                    </div>
                            
                                    <button type="submit" className="btn btn-dark btn-block"> Register</button>
                                    <h4>OR</h4>
                                    <h6 className="card-title d-flex justify-content-center align-items-center">LOGIN WITH</h6>
                                    <div className="login d-flex justify-content-center align-items-center " >
                            
                           
                            <LoginWithGoogle></LoginWithGoogle>
                            <LoginWithFacebook></LoginWithFacebook>
                           
                        </div>
                       
                       
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
