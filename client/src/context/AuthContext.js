import axios from 'axios';
import React,{createContext, useEffect ,useState} from 'react'

const AuthContext = createContext();

function AuthContexProvider(props) {
    
    const [loggedIn , setLoggedIn] = useState("undefined");
    const[username , SetUsername] = useState("");

    async function getLoggedIn(){
        const loggedInRes = await axios.get("http://localhost:5000/users/loggedIn");
        setLoggedIn(loggedInRes.data);

        const usernameRes = await axios.get("http://localhost:5000/users/username");
        SetUsername(usernameRes.data);

    }
    useEffect(()=>{
        getLoggedIn();
    },[]);
    
    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn}}>
        {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export {AuthContexProvider};
