import React ,{useContext}from 'react'
import {BrowserRouter , Switch ,Route} from "react-router-dom";
import Login from './Auth/Login';

import Register from './Auth/Register';
import Secret from './components/Secret';
import AuthContext from './context/AuthContext';
import Navbar from './layout/Navbar';

function Router() {

    const {loggedIn}=useContext(AuthContext);

    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Switch>
                <Route exact path="/"><div>Home</div></Route>
                {loggedIn===false && (<>
                    <Route path="/login"><Login></Login></Route>
                    <Route path="/register"><Register></Register></Route>
                </>)}
                {loggedIn===true &&(<>
                    
                    <Route path="/secret"><Secret></Secret></Route>
                </>)}
            </Switch>
        </BrowserRouter>
    )
}

export default Router
