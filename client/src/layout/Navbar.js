import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';
import AuthContext from '../context/AuthContext';


function Navbar() {

    const {loggedIn} = useContext(AuthContext);

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link" href="/">SECRET</a>
                </div>
                <div >
                    <ul className="navbar-nav mr-auto justify-content-end">
                        
                        {loggedIn===false &&(<>
                        <li className="nav-link">
                            <Link to="/login" >Login</Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/register" >Register</Link>
                        </li>
                        </>)}
                        
                        {loggedIn===true &&(<>
                            <li className="nav-link">
                                <Link to="/secret" >Secret</Link>
                            </li>
                            <li className="nav-link">
                                <Logout></Logout>
                            </li>

                        </>)}
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default Navbar
