import React from "react";
import Router from "./Router";
import axios from "axios";
import {AuthContexProvider} from "./context/AuthContext"

axios.defaults.withCredentials=true;

function App() {
  return (
    <>
    <AuthContexProvider>
    <Router></Router>
    </AuthContexProvider>
    </>
  );
}

export default App;
