import axios from 'axios'
import React, { useContext ,useState} from 'react'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import AuthContext from '../context/AuthContext';
import Button from '../css/Button.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fab)

function LoginWithFacebook() {
    const {getLoggedIn}= useContext(AuthContext);
    const history =useHistory();

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
        <>
             <FacebookLogin
                appId={process.env.REACT_APP_Facebook}
                
                render={renderProps => (
                    <button onClick={renderProps.onClick} className="btn btn-outline-dark "><FontAwesomeIcon icon={['fab', 'facebook']} size="3x" /></button>
                )}
                autoLoad={false}
                callback={responseFacebook}

            /> 
        </>
    )
}

export default LoginWithFacebook
