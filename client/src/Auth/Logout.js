import axios from 'axios'
import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';

function Logout() {
    const {getLoggedIn}= useContext(AuthContext);
    const history =useHistory();
    async function logOut(){
        await axios.get("http://localhost:5000/users/logout");
        await getLoggedIn();
        history.push("/");
    }
    return (
        <button onClick={logOut}>
            Logout
        </button>
    )
}

export default Logout
