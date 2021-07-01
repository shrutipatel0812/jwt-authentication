import axios from 'axios'
import React, { useContext ,useState} from 'react'
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';
import Button from '../css/Button.css'


import LoginWithGoogle from './LoginWithGoogle'
import LoginWithFacebook from './LoginWithFacebook';



function Login() {
    const[email,setEmail]= useState("");
    const [password, setpassword] = useState("");
    const {getLoggedIn}= useContext(AuthContext);
    const history =useHistory();
    

    async function login(e){
        e.preventDefault();
        try{
            const loginData={
                email,
                password
            }
            console.log(loginData);
            await axios.post("http://localhost:5000/users/login" ,loginData)
            await getLoggedIn();
        history.push("/");
        }catch(err){
            console.error(err);
        }
    }

 

    async function  responseFacebook(response){
        try{
            console.log(response);
            await axios({
                method:"POST",
                url:"http://localhost:5000/users/facebookLogin",
                data:{accessToken: response.accessToken,userID:response.userID}
            })
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
                            <h2 className="card-title d-flex justify-content-center align-items-center">LOGIN WITH</h2>
                            <div className="login d-flex justify-content-center align-items-center " >
                            
                           
                                <LoginWithGoogle></LoginWithGoogle>
                                <LoginWithFacebook></LoginWithFacebook>
                               
                            </div>
                           
                            <h4>OR</h4>
                               
                                <form onSubmit={login} className="validated-form" noValidate>
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
                                            onChange={(e)=>setpassword(e.target.value)} 
                                            value={password}>
                                        </input>
                                    </div>
        
                                    <button type="submit" className="btn btn-dark btn-block"> Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
