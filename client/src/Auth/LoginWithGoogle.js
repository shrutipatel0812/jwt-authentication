import axios from 'axios'
import React, { useContext ,useState} from 'react'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';
import Button from '../css/Button.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fab)


function LoginWithGoogle() {

    const {getLoggedIn}= useContext(AuthContext);
    const history =useHistory();
    
    
    async function  responseSuccessGoogle (response){
        try{
            console.log(response);
            
            await axios({
                method:"POST",
                url:"http://localhost:5000/users/googleLogin",
                data:{tokenId:response.tokenId}
            })
            await getLoggedIn();   
        
            history.push("/");

        }catch(err){
            console.error(err);
        }
}

const responseErrorGoogle=(response)=>{

}


    return (
        <>
             <span className="google "> <GoogleLogin 
    clientId= {process.env.REACT_APP_Google}
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-outline-dark " ><FontAwesomeIcon icon={['fab', 'google']} size="3x" /></button>
    )}
    onSuccess={responseSuccessGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  /></span>
        </>
    )
}

export default LoginWithGoogle
